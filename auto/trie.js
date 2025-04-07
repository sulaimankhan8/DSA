class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class AutoComplete {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    autocomplete(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) return [];
            node = node.children[char];
        }
        return this._collectWords(node, prefix);
    }

    _collectWords(node, prefix) {
        let results = [];
        if (node.isEndOfWord) results.push(prefix);
        for (let char in node.children) {
            results = results.concat(this._collectWords(node.children[char], prefix + char));
        }
        return results;
    }
    
    
}
