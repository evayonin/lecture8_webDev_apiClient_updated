import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";
import CustomButton from "./CustomButton.jsx";
import CustomInput from "./CustomInput.jsx";
//דבר ראשון - לעשות אימפורט לאקסיוז (הספריה שלנו)

function App() {
    const [users, setUsers] = useState([])
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [errorCode, setErrorCode] = useState(null);


    //פונקציה ששולחת את הבקשה מיד כשעולה הקומפוננטה
    const getAllUsers = () => {
        axios.get("http://localhost:3306/all")//בקשת API שמביאה את כל היוזרים
            .then((response) => {
                setUsers(response.data.userList)//יוזרליסט זה בעצם השם של המערך שקראתי לו, איפה לראות את זה בבקשה עצמה
            })
    }

    useEffect(() => {//מזמנים את הפונקציה מיד כשעולה הקומפוננטה
        getAllUsers();
    }, []);

    const errorCodeMessage = () => {
        if (errorCode == 3000) {//בג'אווה סקריפט אין משמעות לטיפוסי נתונים, אז זה לא משנה אם זה 2 שווה או 3 שווה
            return "First name is required";
        } else if (errorCode == 3001) {
            return "Last name is required";
        }
        return "";
    }

    return (
        <>
            {
                errorCode != null &&//ואז אם הוא באמת לא יהיה נאל אנחנו נראה הודעה
                <>
                    Something went wrong
                    <div>
                        {errorCodeMessage()}
                    </div>
                </>
            }

            <div>
                <div
                style={{
                    border: '1px solid grey',//גוון פחות גס ולא צעקני
                    padding: '10px',//הוספתי מסגרת על מנת שאוכל להבין על מה אני עובדת + הרחקתי את התוכן מהמסגרת (יותר אסתטי)
                    margin:'40px',//מרחיק את המסגרת החיצונית, תמונה 5 מתארת את זה. אם הייתי רוצה להרחיק רק מלמעלה למשל, הייתי מוסיפה את המילה top לאחר הmargin
                        //לאחר מכן נרצה לשנות את הגוון של הדף בית במקום לבן נשים גוון בהיר (אפשר לחפש בגוגל גוונים)
                    backgroundColor: "#FCFBF4",
                    borderRadius:'30px'
                    //נגיד יש לי לאמנט כפתור וא ניארצה שהוא כל פעם יהיה מעוצב בכל פעם שאצור כפתור, אז אנחנו ניצור קומפוננטה בקובץ בcss
                }}>{/*יצרנו סטייטים עבור שם פרטי ושם משפחה*/}

                    <CustomInput//עשינו את אותו דבר עבור CustomInput
                        placeholder={"Enter first name"}
                        value={firstName}
                        onChange={(event) => {
                        setFirstName(event.target.value)
                    }}
                    />
                    <CustomInput
                        placeholder={"Enter last name"}
                        value={lastName}
                        onChange={(event) => {
                            setLastName(event.target.value)
                        }}/>
                    {/*מה שעשינו כאן בעצם, העברנו את כל מה שהיה בכפתור לתוך הקאסטום באטן-למה? כדי שהוא יוכל לקבל כל קונספט עיצובי שאנחנו נרצה*/}<CustomButton
                        text={"Add"}
                        disabled={firstName.length == 0 || lastName.length == 0 || buttonDisabled}
                        action={() => {
                            setButtonDisabled(true);//הופך את הפונקציה להיות טרו (שלא נוכל ללחוץ בטעות כמה פעמים ולהוסיף את אותו היוזר שוב..)
                            //ואנחנו פונים לשרת רק(!) כאשר לוחצים על הכפתור!
                            axios.get("http://localhost:3306/create-user?first=" + firstName + "" +
                                "&last=" + lastName + "&phone=1234567")//שמות ניקח מהסטייטים, לשים לב שבURL שלנו אנחנו כותבים את השדות בדיוק כמו שכתוב בשרת
                                .then((response) => {
                                    setButtonDisabled(false)//נהפוך אותו שוב לפולס
                                    if (response.data.success) {//התווסף בהצלחה
                                        getAllUsers();
                                        setFirstName("");//משנה חזרה בסטייט לריקים במידה ויוזר ירצה להקליד משהו אחר והוא לא יראה את המשתנה הקודם שהקליד
                                        setLastName("")
                                    } else {
                                        setErrorCode(response.data.errorCode);//תשנה את השגיאה המתאימה בסטייט
                                    }

                                })
                        }}/>
                    {/*ואז כותבים בטקטס מה שאנחנו רוצים שהוא ירנדר*/}

                </div>
                {
                    users.map(item => {//מרנדר איברים בזה אחר זה... (רק שם פרטי כפי שכתוב בשורה 82)
                        return (
                            <div>
                                {item.firstName}
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default App

//
// אם אני אצור מחלקה User עם שדות שם פרטי שם משפחה מספר טלפון ויוזרניים וגטרים וסטרים ובנאי...
// ובמחלקה של השרת GeneralController ניצור נתיב /get-user עם מתודה getUser() שמחזירה יוזר שבתוכה אני מגדירה אובייקט יוזר עם השדות על ידי הבנאי ואז מחזירה אותו. - מה ש spring Boot יודעת לעשות זה להתייחס לאובייקט כג'ייסון! לא משנה אם הוא שטוח או מורכב. זה יוצג לי בדפדפן כגייסון  כשאני שמה localhost/get-user
//
// אם היה לי אובייקט מורכב שמכיל עוד אובייקט עם שדות בתור שדה או מערך כלשהו בתור שדה אז הספרייה תדע להראות לי את זה לג'ייסון בהתאם למבנה!//

//החלק העיקרי של השיעור - למנוע מהנדיפת המידע
//ולכן נשתמש במסדי נתונים ונשמור שם את המידע שלי
//בנוסף גם כתבתי במחלקה של הג'נרל קונטרולר (היא יוצרת רשימה ריקה וכל פעם שהשרת מתתאתחל אז הרשימה מתאפסת ואנחנו לא נרצה זאת
//תזכורת -> רלציוני ולא רלציוני
//רלציוני - יחסי, טבלאות...
//לא רלציוני - ג'ייסונים
//בתכלס אין יותר טוב, נצטרך את שניהם ולכן עדיף תמיד ליצור את 2 סוגי המסדי נתונים
//שי עשה קיצור דרך עם הארגון טבלאות (אעשה צילומי מסך)

//דבר ראשון -> ליצור את המסדי נתונים עם הפרטים שצריך (משתמש ROOT סיסמה מה שנרצה..)
//חשוב ליצור את המסדי נתונים בתוך השרת! לא כאן בקליינט!
//דבר שני -> ליצור סכמה עם איזשהו שם
//דבר שלישי -> לאחר שיצרנו את הסכמה ניצור את הטבלה
//יש טכנולוגיה שיודעת לקחת את הקוד של השאילתא והופכת אותה לטבלה (יהיה צילום מסך)
//לאחר שיצרתי טבלה ואת כל העמודות, וגם קישתרי מפתח ראשי, יצרתי עמודה בשם יוזרניים ועשיתי לו יוניק קי
//זה כדי שלא נסמוך על הקליינט לגמרי, בכל מקרה השם משתמש אמור להיות ייחודי

//נרצה לעשות שאילתא שפונה למסדי נתונים ויוצרת שם רשומה חדשה
//ולכן יש מחלקה מיוחדת שנקראת DBUTILS שכל השאילתות מועברות דרך המחלקה הזאת
//אני עוברת לכתוב הערות במחלקה הזאת אז זה הסוף פה.
