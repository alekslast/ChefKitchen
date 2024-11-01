namespace BusinessLogic.DTOs
{
	public class PasswordRecoveryModel
	{
		public string	UserEmail			{ get; set; }
		public string	RecoveryCode		{ get; set; }
		public string	Password			{ get; set; }
		public string	ConfirmPassword		{ get; set; }
	}
}
