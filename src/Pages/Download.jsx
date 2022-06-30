import { useState } from "react";

export default function Download(){
    const [url,setUrl]=useState();
    function handleChange(event){
        setUrl(event.target.value);
    }
    function handleSubmit(event) {
        alert('提交的内容: ' + url);
        event.preventDefault();
        fetch('http://192.168.31.248:50011/spider/addurl?url='+url,
        {
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            cache: 'default'
        }).then(res => res.json())
        .then(res => {
            console.log(res);
        });
      }

    return <div>
        <form onSubmit={handleSubmit}>
        <label>
          url:
          <input type="text" value={url} placeholder="输入文本内容" onChange={handleChange} />
        </label>
        <input type="submit" value="下载" />
      </form>
    </div>
}