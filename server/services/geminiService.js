import { ai } from "../utils/geminiAPI.js";

export async function generateDSAResponse(messages) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: messages.map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      })),
      config: {
        systemInstruction: `You are an EXPERT Data Structures and Algorithms (DSA) Instructor and Coding Interview Coach. Your responses must be COMPREHENSIVE and follow this EXACT structure:

# RESPONSE TEMPLATE (MUST FOLLOW):

## 🎯 **Concept Overview**
- Brief definition and core idea
- When to use this data structure/algorithm
- Key characteristics and properties

## 📊 **Complexity Analysis**
**Time Complexity:** Best/Average/Worst cases
**Space Complexity:** Memory requirements
**Key Insights:** Why these complexities occur

## 🏗️ **Core Operations**
### Access | Search | Insertion | Deletion
- Explain each operation with examples
- Compare with alternative structures

## 💻 **Code Implementation** (C++ by default)
\`\`\`cpp
// Clean, optimized code with comments
// Include necessary headers
// Provide complete working example
\`\`\`

## 🔍 **Step-by-Step Example**
**Input:** Concrete example
**Dry Run:** Visual step-by-step execution
**Output:** Expected result with explanation

## 🌍 **Real-World Applications**
- 3-5 practical use cases
- Industry applications
- Problem-solving patterns

## 🚀 **Common Variations & Edge Cases**
- Different approaches
- Optimization techniques
- Handling edge cases

## 📝 **Practice Problems**
- 2-3 related LeetCode problems
- Difficulty levels
- Key learning points

## ❓ **Interview Tips**
- Common interview questions
- What interviewers look for
- Red flags to avoid

# RULES:

## Language Priority:
1. **C++** (default - most efficient for interviews)
2. **Python** (if user requests - for readability)
3. **Java** (if user explicitly asks)

## Response Style:
- Be **encouraging** and **supportive**
- Use **emoji** for better readability 🎯💻🚀
- Break complex concepts into **digestible chunks**
- Provide **multiple examples** for clarity
- Include **visual metaphors** where helpful

## For Non-DSA Questions:
Respond professionally: "I specialize in Data Structures and Algorithms. Please ask me about arrays, trees, graphs, dynamic programming, or other CS fundamentals!"

## Example Excellence:

### User: "Explain binary search trees"

**Your Response Structure:**
🎯 **Binary Search Trees Overview**
- Self-balancing binary tree with ordered elements
- Left subtree < Root < Right subtree
- Perfect for efficient search operations

📊 **Complexity Analysis**
**Search:** O(log n) average, O(n) worst
**Insert/Delete:** O(log n) average, O(n) worst
**Space:** O(n) for storing nodes

🏗️ **Core Operations**
- **Search:** Traverse comparing values
- **Insert:** Find position maintaining order
- **Delete:** Three cases (no child, one child, two children)

💻 **C++ Implementation**
\`\`\`cpp
#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* left;
    Node* right;
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};

// Search implementation
bool search(Node* root, int key) {
    if (!root) return false;
    if (root->data == key) return true;
    if (key < root->data) return search(root->left, key);
    return search(root->right, key);
}
\`\`\`

🔍 **Example: Search for 25**
Tree: [20, 30, 25, 40, 15]
Step 1: 20 < 25 → go right
Step 2: 30 > 25 → go left
Step 3: 25 == 25 → found! ✅

🌍 **Real-World Uses**
- Database indexing
- File system organization
- Network routing tables
- Auto-completion systems

🚀 **Variations**
- AVL Trees (self-balancing)
- Red-Black Trees
- B-Trees (database indices)

📝 **Practice Problems**
- LeetCode 98: Validate BST
- LeetCode 701: Insert into BST
- LeetCode 450: Delete Node in BST

❓ **Interview Tips**
- Always check if tree is valid BST
- Handle duplicate values policy
- Discuss balancing trade-offs

## Enhanced Examples:

### User: "What is dynamic programming?"
**Cover:** Memoization vs Tabulation, Top-down vs Bottom-up, State definition, Transition relation, Base cases

### User: "Explain graph traversal"
**Cover:** BFS (queue), DFS (stack/recursion), Applications, When to use each, Complexity comparison

### User: "How to solve Two Sum?"
**Cover:** Brute force → Hash map optimization, Trade-offs, Edge cases, Multiple approaches

## Always Include:
- **Multiple code examples** with increasing complexity
- **Visual explanations** using text diagrams
- **Real interview experiences**
- **Common mistakes** and how to avoid them
- **Optimization pathways**

Be the ULTIMATE DSA tutor that students wish they had! Make complex concepts feel simple and approachable.`,
      },
    });

    // console.log('Response type:', typeof response);
    // console.log('Response keys:', Object.keys(response));
    // console.log('Full response:', response);

    // FIX: The response is already parsed, so extract the text properly
    if (response.candidates && response.candidates[0] && response.candidates[0].content) {
      return response.candidates[0].content.parts[0].text;
    } else if (response.text) {
      return response.text;
    } else {
      console.error('Unexpected response format:', response);
      throw new Error('Unexpected response format from Gemini API');
    }

  } catch (error) {
    console.error("Gemini API Error:", error);

    // Fallback to enhanced mock responses
    return generateEnhancedMockResponse(messages);
  }
}

// Enhanced fallback mock responses
function generateEnhancedMockResponse(messages) {
  const lastUserMessage = messages
    .filter((msg) => msg.sender === "user")
    .pop()?.text || "Hello";

  const lowerMessage = lastUserMessage.toLowerCase();

  // Enhanced comprehensive responses
  const enhancedResponses = {
    "array": `🎯 **Arrays Overview**
Arrays store elements in contiguous memory locations, providing O(1) random access.

📊 **Complexity Analysis**
**Access:** O(1) - Direct indexing
**Search:** O(n) - Linear search required
**Insertion:** O(n) - Shifting elements needed
**Deletion:** O(n) - Shifting elements needed

🏗️ **Core Operations**
- **Access:** arr[i] directly accesses element
- **Search:** Iterate through elements
- **Insert:** Shift right from position
- **Delete:** Shift left from position

💻 **C++ Implementation**
\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arr = {1, 2, 3, 4, 5};

    // Access
    cout << "Element at index 2: " << arr[2] << endl;

    // Search
    int target = 3;
    for(int i = 0; i < arr.size(); i++) {
        if(arr[i] == target) {
            cout << "Found at index: " << i << endl;
            break;
        }
    }

    // Insert at position 2
    arr.insert(arr.begin() + 2, 10);

    // Delete from position 3
    arr.erase(arr.begin() + 3);

    return 0;
}
\`\`\`

🔍 **Example: Insert at Position**
Initial: [1, 2, 3, 4, 5]
Insert 10 at index 2: [1, 2, 10, 3, 4, 5]

🌍 **Real-World Applications**
- Database records storage
- Image pixel data
- Game object management
- Buffer implementations

🚀 **Common Variations**
- Dynamic Arrays (vectors)
- Multi-dimensional Arrays
- Sparse Arrays
- Circular Arrays

📝 **Practice Problems**
- LeetCode 1: Two Sum
- LeetCode 26: Remove Duplicates
- LeetCode 189: Rotate Array

❓ **Interview Tips**
- Always check array bounds
- Consider edge cases (empty, single element)
- Discuss time-space tradeoffs`,

    "tree": `🎯 **Trees Overview**
Hierarchical data structure with root node and children. Perfect for representing nested data.

📊 **Complexity Analysis**
**Search:** O(log n) in balanced trees
**Insert/Delete:** O(log n) in balanced trees
**Traversal:** O(n) for all nodes
**Space:** O(n) for storage

🏗️ **Core Operations**
- **Traversal:** Inorder, Preorder, Postorder
- **Search:** Recursive/Iterative search
- **Insert:** Maintain tree properties
- **Delete:** Handle different cases

💻 **Binary Tree Implementation**
\`\`\`cpp
#include <iostream>
#include <queue>
using namespace std;

class TreeNode {
public:
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Inorder Traversal (Left, Root, Right)
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

// Level Order Traversal
void levelOrder(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        TreeNode* current = q.front();
        q.pop();
        cout << current->val << " ";

        if (current->left) q.push(current->left);
        if (current->right) q.push(current->right);
    }
}
\`\`\`

🔍 **Traversal Example**
Tree:
    1
   / \\
  2   3
 / \\
4   5

Inorder: 4 2 5 1 3
Preorder: 1 2 4 5 3
Postorder: 4 5 2 3 1
Levelorder: 1 2 3 4 5

🌍 **Real-World Applications**
- File systems (directories)
- Organization charts
- XML/HTML DOM
- Decision trees (AI)
- Database indices

🚀 **Tree Variations**
- Binary Search Trees
- AVL Trees (self-balancing)
- Red-Black Trees
- B-Trees (databases)
- Trie (prefix trees)

📝 **Practice Problems**
- LeetCode 94: Binary Tree Inorder Traversal
- LeetCode 104: Maximum Depth
- LeetCode 102: Level Order Traversal

❓ **Interview Tips**
- Always handle null root case
- Choose traversal based on problem
- Consider recursive vs iterative approaches`,

    "graph": `🎯 **Graphs Overview**
Collection of nodes (vertices) connected by edges. Model complex relationships and networks.

📊 **Complexity Analysis**
**Storage:** O(V + E) - Adjacency list
**BFS/DFS:** O(V + E) - Visit all components
**Shortest Path:** O((V+E)log V) - Dijkstra
**Space:** O(V) for algorithms

🏗️ **Core Operations**
- **Traversal:** BFS (queue), DFS (stack)
- **Search:** Find paths between nodes
- **Shortest Path:** Dijkstra, Bellman-Ford
- **Cycle Detection:** DFS with visited states

💻 **Graph Implementation & BFS**
\`\`\`cpp
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_set>
using namespace std;

class Graph {
    int V;
    vector<vector<int>> adj;

public:
    Graph(int vertices) : V(vertices), adj(vertices) {}

    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u); // Undirected graph
    }

    void BFS(int start) {
        vector<bool> visited(V, false);
        queue<int> q;

        visited[start] = true;
        q.push(start);

        while (!q.empty()) {
            int current = q.front();
            q.pop();
            cout << current << " ";

            for (int neighbor : adj[current]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
    }
};

int main() {
    Graph g(5);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(2, 4);

    cout << "BFS from node 0: ";
    g.BFS(0); // Output: 0 1 2 3 4

    return 0;
}
\`\`\`

🔍 **BFS Example**
Graph:
0 - 1 - 3
|
2 - 4

BFS from 0: 0 → 1 → 2 → 3 → 4

🌍 **Real-World Applications**
- Social networks (friends)
- Web page links
- Transportation networks
- Neural networks
- Recommendation systems

🚀 **Graph Algorithms**
- **BFS:** Shortest path in unweighted graphs
- **DFS:** Cycle detection, topological sort
- **Dijkstra:** Shortest path with weights
- **Prim/Kruskal:** Minimum spanning tree

📝 **Practice Problems**
- LeetCode 200: Number of Islands
- LeetCode 207: Course Schedule
- LeetCode 743: Network Delay Time

❓ **Interview Tips**
- Choose representation based on density
- Handle disconnected components
- Consider directed vs undirected`,

    "dp": `🎯 **Dynamic Programming Overview**
Technique to solve complex problems by breaking into overlapping subproblems. Store results to avoid recomputation.

📊 **Complexity Analysis**
**Time:** O(n) to O(n²) based on state space
**Space:** O(n) for tabulation, O(n) + stack for memoization
**Key Insight:** Exponential → Polynomial time

🏗️ **Core Approaches**
- **Memoization:** Top-down with recursion + caching
- **Tabulation:** Bottom-up with iteration
- **State Definition:** What parameters define subproblem?
- **Transition:** How to build larger solutions from smaller ones?

💻 **Fibonacci - Both Approaches**
\`\`\`cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// 1. Memoization (Top-Down)
unordered_map<int, int> memo;
int fibMemo(int n) {
    if (n <= 1) return n;
    if (memo.find(n) != memo.end()) return memo[n];

    memo[n] = fibMemo(n-1) + fibMemo(n-2);
    return memo[n];
}

// 2. Tabulation (Bottom-Up)
int fibTab(int n) {
    if (n <= 1) return n;

    vector<int> dp(n+1);
    dp[0] = 0;
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }

    return dp[n];
}

// 3. Space Optimized
int fibOptimized(int n) {
    if (n <= 1) return n;

    int prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}

int main() {
    cout << "Fibonacci(10): " << fibTab(10) << endl; // 55
    return 0;
}
\`\`\`

🔍 **DP Thinking Process**
1. **Identify overlapping subproblems**
2. **Define state representation**
3. **Formulate recurrence relation**
4. **Handle base cases**
5. **Choose memoization vs tabulation**

🌍 **Real-World Applications**
- Stock trading strategies
- Resource allocation
- Game theory
- Natural language processing
- Robotics path planning

🚀 **Classic DP Problems**
- **0/1 Knapsack:** Resource allocation
- **Longest Common Subsequence:** String similarity
- **Coin Change:** Payment systems
- **Matrix Chain Multiplication:** Optimization

📝 **Practice Problems**
- LeetCode 70: Climbing Stairs
- LeetCode 322: Coin Change
- LeetCode 1143: Longest Common Subsequence

❓ **Interview Tips**
- Start with brute force recursion
- Identify overlapping subproblems
- Discuss space optimization
- Practice state transition thinking`
  };

  // Check for exact matches first
  for (const [key, response] of Object.entries(enhancedResponses)) {
    if (lowerMessage.includes(key) && lowerMessage.split(' ').length <= 5) {
      return response;
    }
  }

  // Check for broader concepts
  const conceptMap = {
    "sort": "array", "search": "array", "linked": "array",
    "binary": "tree", "bst": "tree", "traversal": "tree",
    "bfs": "graph", "dfs": "graph", "dijkstra": "graph",
    "memo": "dp", "tabulation": "dp", "knapsack": "dp"
  };

  for (const [concept, category] of Object.entries(conceptMap)) {
    if (lowerMessage.includes(concept)) {
      return enhancedResponses[category];
    }
  }

  // Default comprehensive response
  return `🎯 **DSA Learning Path**

I can help you master Data Structures & Algorithms! Here's what I cover comprehensively:

## 📚 **Core Data Structures**
- **Arrays & Strings** - Foundation of all structures
- **Linked Lists** - Dynamic memory management
- **Stacks & Queues** - LIFO/FIFO operations
- **Trees** - Hierarchical data (BST, AVL, Heaps)
- **Graphs** - Network relationships (BFS, DFS, Shortest Path)
- **Hash Tables** - O(1) average operations

## ⚡ **Essential Algorithms**
- **Sorting** - QuickSort, MergeSort, HeapSort
- **Searching** - Binary Search, Hashing
- **Dynamic Programming** - Optimal substructure
- **Greedy Algorithms** - Local optima → Global optima
- **Backtracking** - Systematic trial & error

## 💡 **For "${lastUserMessage}" I can provide:**

### 🏗️ **Comprehensive Theory**
- Mathematical foundations
- Complexity analysis (Big O)
- Implementation details
- Trade-off comparisons

### 💻 **Practical Code Examples**
- Multiple implementations
- Edge case handling
- Optimization techniques
- Language-specific tips

### 🔍 **Step-by-Step Walkthroughs**
- Visual execution traces
- Dry-run examples
- Debugging techniques
- Common pitfalls

### 🌍 **Real-World Applications**
- Industry use cases
- System design applications
- Interview patterns
- Career relevance

### 📝 **Practice Framework**
- LeetCode problem recommendations
- Pattern recognition
- Solution templates
- Time management

**What specific DSA topic would you like to explore in depth?** I'll give you the complete picture with examples, code, and practical insights!`;
}