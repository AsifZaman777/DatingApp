namespace API.Models
{
    public class AppUser
    {
        public int Id { get; set; }
        public required string Username { get; set; } // string is a reference type

    }
}
