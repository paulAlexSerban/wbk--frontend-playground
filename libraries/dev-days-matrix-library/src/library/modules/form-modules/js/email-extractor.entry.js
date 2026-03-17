const rawTxt = document.querySelector('textarea[name=txtarea]');
const finTxt = document.querySelector('textarea[name=output]');
const btn = document.querySelector('button');
const counter = document.querySelector('.counter');
btn.addEventListener('click', () => {
    const temp = rawTxt.value;
    const exp = /([A-Za-z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    const emailData = temp.match(exp);
    const holder = [];
    for (let x = 0; x < emailData.length; x++) {
        if (holder.indexOf(emailData[x]) == -1) {
            holder.push(emailData[x]);
        }
    }
    const tempHolder = holder.join(';');
    counter.innerText = 'Emails Found ' + holder.length;
    finTxt.innerText = tempHolder;
});
finTxt.addEventListener('click', function () {
    this.select();
});
