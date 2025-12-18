function CustomInput(props){//אותו סיפור גם פה
    return (
        <input
            style={{
                margin:3,
                border:0,
                borderBottom:"10x solid black",
                backgroundColor:"transparent",
                color:"black"
            }}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
        />
    )

}

export default CustomInput;