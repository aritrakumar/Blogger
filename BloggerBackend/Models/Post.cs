namespace BloggerBackend.Models;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Post
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? postId{ get; set; }
    public string postTitle{ get; set; }
    public string postBody{ get; set; }
    public string authorId{ get; set; }
}