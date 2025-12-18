function CustomButton(props) {//נביא לו props מבחוץ כדי שכל פעם שנזמן הוא ירנדר משהו אחר
    //אם נשתמש כל הזמן בקאסטום, אנחנו נוכל לקבל את הנתונים, את העיצוב שמובנה בפנים


    return (
        <span>
            <button
                style={{
                    backgroundColor: "#0047AB",
                    color:'white',//הצבע של הכפתור עצמו כהה, שינינו את הצבע של התוכן ללבן על מנת שנוכל לראות
                    border: '0px',
                    paddingTop: '3px',
                    paddingBottom: '3px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    borderRadius: '5px',

                }}
                disabled={props.disabled}
                    onClick={props.action}>{/*גם פה מקבל disable מבחוץ*/}
                {props.text}
            </button>
        </span>
    )
}

export default CustomButton;
