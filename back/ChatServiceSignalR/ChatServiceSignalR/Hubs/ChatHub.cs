using ChatServiceSignalR.DataService;
using ChatServiceSignalR.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatServiceSignalR.Hubs
{
    public class ChatHub : Hub
    {
        private readonly SharedDb _sharedDb;
        public ChatHub(SharedDb sharedDb)
        {
            _sharedDb = sharedDb;
        }

        public async Task JoinChat(UserConnection connection)
        {
            await Clients.All
                .SendAsync("ReceiveMessage", "admin", $"{connection.Username} has joinded");
        }

        public async Task JoinSpecificChatRoom(UserConnection connection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);

            _sharedDb.Connections[Context.ConnectionId] = connection;

            await Clients.Group(connection.ChatRoom)
                .SendAsync("JoinSpecificChatRoom", "admin", $"{connection.Username} has joinded {connection.ChatRoom}");
        }

        public async Task SendMessage(string message)
        {
            if(_sharedDb.Connections.TryGetValue(Context.ConnectionId, out var conn))
            {
                await Clients.Group(conn.ChatRoom)
                    .SendAsync("ReceiveSpecificMessage", conn.Username, message);
            }
        }
    }
}
