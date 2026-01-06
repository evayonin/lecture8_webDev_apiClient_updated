function CustomButton(props) {//נביא לו props מבחוץ כדי שכל פעם שנזמן הוא ירנדר משהו אחר
    //אם נשתמש כל הזמן בקאסטום, אנחנו נוכל לקבל את הנתונים, את העיצוב שמובנה בפנים


    return (
        <span>
            <button
                // אגב כדי לבדוק איזה עיצוב נראה טוב שי סתם הלך לאתר אחד ולחץ לחצן ימני ו inspect על כפתור (קומפוננטת כפתור) ויכל לראות את ה styles של אותו element.
                style={{
                    backgroundColor: "#0047AB",
                    color:'white',//הצבע של הכפתור עצמו כהה, שינינו את הצבע של התוכן ללבן על מנת שנוכל לראות
                    border: '0px',
                    paddingTop: '3px',
                    paddingBottom: '3px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    borderRadius: '5px', // עיכול הפינות

                }}
                disabled={props.disabled} // הערך של דיסאייבלד שמועבר מבחוץ
                    onClick={props.action}>{/*גם פה מקבל און קליק (בשם אקשן) מבחוץ*/}
                {props.text // יציג את הטקסט שמביאים מבחוץ
                }
            </button>
        </span>
    )
}

export default CustomButton;
