require('./def.less');
module.exports = (txt) => {
    function click() {
        alert(txt);
    }
    return <div className="center" onClick={click}>hello {txt},点我!</div>;
}