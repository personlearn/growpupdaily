import "./InputRadio.css"

function InputRadio(props){
    return <div className="radio">
        <div className="rdiotxt">{props.name}</div><div className="radiocheck">
            <input type="checkbox" value={props.val} defaultChecked={props.tags.includes(props.val)} checked={props.tags.includes(props.val)} onChange={props.onChange}></input>
            </div>
    </div>
}

export default InputRadio;