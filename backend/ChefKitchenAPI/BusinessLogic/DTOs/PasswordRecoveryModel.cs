namespace BusinessLogic.DTOs
{
	public class PasswordRecoveryModel : RecoveryCodeModel
	{
		public string	NewPassword			{ get; set; }
		public string	ConfirmPassword		{ get; set; }
	}
}
