using BusinessLogic.Interfaces;
using System.Security.Cryptography;






namespace BusinessLogic.Services
{
    public sealed class PasswordHasher : IPasswordHasher
    {
        private const int SaltSize      =   16;
        private const int HashSize      =   32;
        private const int Iterations    =   100_000;

        private static readonly HashAlgorithmName Algorithm = HashAlgorithmName.SHA512;


        public string Hash(string password)
        {
            byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);
            byte[] hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, Algorithm, HashSize);

            return $"{Convert.ToHexString(hash)}-{Convert.ToHexString(salt)}";
        }





        public bool Verify(string password, string passwordHash)
        {
            string[] hashParts  =   passwordHash.Split("-");
            byte[] hash         =   Convert.FromHexString(hashParts[0]);
            byte[] salt         =   Convert.FromHexString(hashParts[1]);

            byte[] convertedInputPassword = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, Algorithm, HashSize);

            //return hash.SequenceEqual(convertedInputPassword);
            return CryptographicOperations.FixedTimeEquals(hash, convertedInputPassword); // compares based on the length of the array, not on how long it takes to compare the individual values
        }
    }
}
