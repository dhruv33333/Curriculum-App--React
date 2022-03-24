
class Node {
    id;
    name;
    level;
    previous;
    next;
    parent;
    children;
    constructor(name, parent) {
        this.id = randomString(7);
        this.name = name;
        this.parent = parent;
        this.children = [];
    }
}

const randomString = (length) => {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

export default Node;