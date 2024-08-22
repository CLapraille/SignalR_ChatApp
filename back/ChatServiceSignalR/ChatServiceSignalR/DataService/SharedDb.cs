using ChatServiceSignalR.Models;
using System.Collections.Concurrent;

namespace ChatServiceSignalR.DataService
{
    public class SharedDb
    {
        private readonly ConcurrentDictionary<string, UserConnection> _connections = new();

        public ConcurrentDictionary<string, UserConnection> Connections => _connections;
    }
}
