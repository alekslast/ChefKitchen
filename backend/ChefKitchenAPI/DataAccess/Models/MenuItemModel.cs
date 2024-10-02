﻿namespace DataAccess.Models
{
    public class MenuItemModel
    {
        public int          Id              { get; set; }
        public string       MealType        { get; set; }
        public string       MealName        { get; set; }
        public int          Protein         { get; set; }
        public int          Fats            { get; set; }
        public int          Carbs           { get; set; }
        public int          Energy          { get; set; }
        public int          TotalWeight     { get; set; }

        public int          OrderId         { get; set; }
        public OrderModel   Order           { get; set; }

    }
}