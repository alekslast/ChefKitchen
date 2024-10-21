namespace BusinessLogic.DTOs
{
    public class MenuItemDto
    {
        public int Id { get; set; }
        public string MealType { get; set; }
        public string MealName { get; set; }
        public int Protein { get; set; }
        public int Fats { get; set; }
        public int Carbs { get; set; }
        public int Energy { get; set; }
        public int TotalWeight { get; set; }
    }
}
