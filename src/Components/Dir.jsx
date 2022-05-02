import './dir.css'

function Dir(props) {

    return <div className="dir" onClick={() => props.onClick(props.tagid)}>
        <div>
            <img src="./dir.png" alt='./dir.png'></img>
            {props.tagname}
        </div>

    </div>
}

export default Dir;