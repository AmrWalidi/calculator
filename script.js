let txt = "";
let stack = [];
let postfix = [];
let mtn = document.createElement("textarea");
let mtn2 = document.createElement("textarea");
mtn.innerHTML = "&divide;";
mtn2.innerHTML = "&times;";
let divide = mtn.value;
let times = mtn2.value;
let operators = [divide,times,'+','-'];
function result(arr){
    for (let index = 0; index < arr.length; index++) {
        if(arr[index] == '+'){
            let num1 = parseFloat(stack.pop());
            let num2 = parseFloat(stack.pop());
            let ans = num2 + num1;
            stack.push(ans);
        }
        else if(arr[index] == '-'){
            let num1 = parseFloat(stack.pop());
            let num2 = parseFloat(stack.pop());
            let ans = num2 - num1;
            stack.push(ans);
            
        }else if(arr[index] == divide){
            let num1 = parseFloat(stack.pop());
            let num2 = parseFloat(stack.pop());
            let ans = num2 / num1;
            stack.push(ans);
            
        }else if(arr[index] == times){
            let num1 = parseFloat(stack.pop());
            let num2 = parseFloat(stack.pop());
            let ans = num2 * num1;
            stack.push(ans);
        }
        else {
            stack.push(arr[index])
        }
    }
}
function opStack(x) {
    let newOp,oldOp;
    if(stack.length == 0 || x == '(' || stack[stack.length-1] == '('){
        stack.push(x);
    }
    else if (x== ')') {
        let idx = stack.length-1;
        while(stack[idx] != '('){
            postfix.push(stack.pop());
            idx--;
        }
        stack.pop();
    }
    else {
        let idx = stack.length;
        for (let index = 0; index < idx; index++) {
            oldOp = operators.indexOf(stack[stack.length -1]);
            newOp = operators.indexOf(x);
            if ((x == '+' && stack[stack.length-1] == '-') || (x == '-' && stack[stack.length-1] == '+')){
                postfix.push(stack.pop());
                break;
            }
            else if(newOp < oldOp){
                break;
            }
            else if (oldOp < newOp){
                postfix.push(stack.pop());
            }
        }
        stack.push(x);
    }
}
function calculate() {
    postfix.length = 0 ;
    stack.length = 0;
    let i = 0, j = 0;
    for (let index = 0; index < txt.length; index++) {
        let element = txt.charAt(index);
        if(index == txt.length -1){
            if(element == ')'){
                postfix.push(txt.slice(i,j));
                i = j = index + 1;
                opStack(element);
                while(stack.length != 0){
                    postfix.push(stack.pop());
                }
            }
            else if(operators.includes(element)){
                postfix.push(txt.slice(i,j));
                i = j = index + 1;
                opStack(element);
            }
            else{
                postfix.push(txt.slice(i,j+1));
                while(stack.length != 0){
                    postfix.push(stack.pop());
                }
            }
        }
        else if (element == ')'){
            postfix.push(txt.slice(i,j));
            i = j = index + 1;
            opStack(element);
        }
        else if(operators.includes(element)){
            if(txt.charAt(index -1) == ')'){
                opStack(element);
                i = j = index + 1;
            }
            else{
                postfix.push(txt.slice(i,j));
                i = j = index + 1;
                opStack(element);
            }
        }
        else if(element == '('){
            i = j = index +1;
            opStack(element);
        }
        else {
            j++;
        }
    }
    result(postfix)
    document.getElementById("ans").innerHTML = stack[0];
}

function clicked (btn) {
    if(btn.innerHTML == '(' && !isNaN(txt.charAt(txt.length -1))){
        txt = txt + times + btn.innerHTML;
        document.getElementById("operations").innerHTML = txt;
        calculate();
    }
    else {
        txt += btn.innerHTML;
        document.getElementById("operations").innerHTML = txt;
        calculate();
    }
}

function dlt() {
    txt = txt.slice(0,-1);
    document.getElementById("operations").innerHTML = txt;
}

function empty() {
    txt = "";
    stack.length = 0;
    postfix.length = 0 ;
    document.getElementById("operations").innerHTML = txt;
    document.getElementById("ans").innerHTML = "";
}

function printAnswer(){
    document.getElementById("operations").innerHTML = stack[0]
    document.getElementById("ans").innerHTML = "";
    stack.length = 0;
    postfix.length = 0;
    txt = "";
}

