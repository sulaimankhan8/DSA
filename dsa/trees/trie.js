/*
✅ What’s a Trie?
A Trie is a special tree used to store strings. It’s super useful for:

Fast prefix search (e.g. “do any words start with 'app'?”)

Auto-completion

Word dictionary checks

🔧 Basic Operations:
Operation	Description
insert(word)	Add a word to the trie
search(word)	Check if the word exists exactly
startsWith(pre)	Check if any word starts with pre
*/

class TrieNode{
    constructor(){
        this.children={};
        this.isEndOfWord=false;
    }
}

class Trie{
    constructor(){
        this.root=new TrieNode();
    }

    insert(word){
        let node=this.root;

        for(let char of word){
            if(!node.children[char]){
                node.children[char]=new TrieNode();
            }
            node=node.children[char];
        }
        node.isEndOfWord=true;
    }
    search(word){
        let node=this.root;

        for(let char of word){
            if(!node.children[char]){
                return false;
            }
            node=node.children[char];
        }

        return node.isEndOfWord;
    }

    startsWith(prefix){
        let node=this.root;

        for (let char of prefix) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }

        const res=[];
        console.log("finding sugestion :",prefix);
        this.dfs(node,prefix,res);
        console.log("suggestion",res);
        
        return res;
    }
    dfs(node,path,res){
        if(node.isEndOfWord){
            console.log("word found:",path);
            res.push(path);
        }
        for(let i=0;i<26;i++){
            if(node.children[String.fromCharCode(i+97)]){
                let char=String.fromCharCode(97+i);
                this.dfs(node.children[String.fromCharCode(i+97)],path+char,res)
            }
        }
    }
}

const trie = new Trie();

trie.insert("dog");
trie.insert("door");
trie.insert("dove");
trie.insert("dot");
trie.insert("dorm");

console.log(trie.startsWith("do")); // ➜ ["dog", "door", "dove", "dot", "dorm"]
console.log(trie.startsWith("dor")); // ➜ ["dorm"]
console.log(trie.startsWith("z")); // ➜ []
