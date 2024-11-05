

export default function ResetPasswordScreen() {
    return (
        <div>
            <form>
                <div>
                    <label>New Password:</label>
                    <input type="text" />
                </div>

                <div>
                    <label>Confirm Password:</label>
                    <input type="text" />
                </div>

                <input type="submit" value="Done" />
            </form>
        </div>
    )
}
