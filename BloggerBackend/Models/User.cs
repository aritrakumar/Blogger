namespace BloggerBackend.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? _id { get; set; }
    public string? userName{ get; set; }
    public string password{ get; set; }
    public string userEmail{ get; set; }
}