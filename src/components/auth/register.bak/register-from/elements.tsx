
export function RgName() {
    return (
        <div className="form-group">
            <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
            <input type="text" name="name" id="name" placeholder="Your Name" />
        </div>
    );
}


export function RgUsername() {
    return (
        <div className="form-group">
            <label htmlFor="username"><i className="zmdi zmdi-email"></i></label>
            <input type="text" name="username" id="username" placeholder="Your Username" />
        </div>
    );
}
export function RgPassword() {
    return (
        <div className="form-group">
            <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
            <input type="password" name="password" id="password" placeholder="Password" />
        </div>
    );
}

export function RgConfirmPassword() {
    return (
        <div className="form-group">
            <label htmlFor="re-password"><i className="zmdi zmdi-lock-outline"></i></label>
            <input type="password" name="re-password" id="re-password" placeholder="Repeat your password" />
        </div>
    );
}
export function RgAgreeterm() {
    return (
        <div className="form-group">
            <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
            <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
        </div>
    );
}
export function RgSubmitButton() {
    return (
        <div className="form-group form-button">
            <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
        </div>
    );
}
export function RgProgile() {
    return (
        <div className="form-group">
            <label htmlFor="profile" className="profile-label">Select Profile Image</label>
            <input id="profile" name="profile"  style={{visibility:"hidden"}} onChange={e=>{
                e.target.style.visibility= "visible";
            }} type="file"/>
        </div>
    );
}