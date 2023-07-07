
const ButtonCopy = ({targetRef, show = true}) => {
    const copy = () => {
        const { current } = targetRef;
        const isInput = /input|textarea|select/.test(current.tagName.toLowerCase());

        navigator.clipboard.writeText(current[isInput ? 'value' : 'innerText']);
        window.getSelection().selectAllChildren(current);
    }

    return (
        <>
        {show ? (
            <button className="copy" onClick={copy}>Copy</button>
        ) : ''}
        </>
        
     );
}
 
export default ButtonCopy;