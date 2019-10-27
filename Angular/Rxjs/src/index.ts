import { Observable, fromEvent } from 'rxjs';

function addItem(value: any) {
    const node = document.createElement('li');
    const textNode = document.createTextNode(value);

    node.appendChild(textNode);
    document.getElementById('output').appendChild(node);
}
