以下是用 TypeScript 实现的泛型 LRU 缓存，基于双向链表与哈希表：

```typescript
class ListNode<K, V> {
  key: K;
  value: V;
  prev: ListNode<K, V> | null = null;
  next: ListNode<K, V> | null = null;
  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

class LRUCache<K, V> {
  private capacity: number;
  private map: Map<K, ListNode<K, V>>;
  private head: ListNode<K, V>;
  private tail: ListNode<K, V>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = new ListNode<K, V>(null as any, null as any);
    this.tail = new ListNode<K, V>(null as any, null as any);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: K): V | number {
    const node = this.map.get(key);
    if (!node) return -1;
    this.moveToHead(node);
    return node.value;
  }

  put(key: K, value: V): void {
    const node = this.map.get(key);
    if (node) {
      node.value = value;
      this.moveToHead(node);
    } else {
      const newNode = new ListNode(key, value);
      this.map.set(key, newNode);
      this.addToHead(newNode);
      if (this.map.size > this.capacity) {
        const removed = this.removeTail();
        this.map.delete(removed.key);
      }
    }
  }

  private addToHead(node: ListNode<K, V>): void {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  private removeNode(node: ListNode<K, V>): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private moveToHead(node: ListNode<K, V>): void {
    this.removeNode(node);
    this.addToHead(node);
  }

  private removeTail(): ListNode<K, V> {
    const node = this.tail.prev!;
    this.removeNode(node);
    return node;
  }
}
```

**O(1) 原因**  
- 哈希表 `Map` 的查找、插入、删除都是均摊 O(1)，保证无需遍历即可定位节点。  
- 双向链表的节点移除、插入头部、删除尾部仅修改相邻指针，均为 O(1)。  
- `get` 和 `put` 操作由上述原子操作组合而成，整体保持常数时间复杂度。

**LRU 导致命中率变差的业务场景**  
设想一个周期性批量推荐任务：系统每晚重新计算用户特征，需要依次扫描全部用户画像。缓存容量略小于用户总量。当遍历访问用户数据时，LRU 会不断把“较旧”的画像逐出，腾出空间给新读入的画像。然而，下一轮扫描又将立刻访问刚刚被淘汰的画像，导致几乎每次访问都无法命中，全部回源加载。此时访问模式是循环扫描，工作集大于缓存，LRU 的“最近不用将来也不用”假设完全失效，命中率反而远差于频率优先等其他策略。