const messageInput = document.getElementById('messageInput');
        messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 140) + 'px';
        });

        function sendMessage(event) {
            event.preventDefault();
            const messageText = messageInput.value.trim();
            if (!messageText) return;

            const messagesContainer = document.getElementById('messagesContainer');
            const messageGroup = document.createElement('div');
            messageGroup.className = 'message-group sent';
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

            messageGroup.innerHTML = `
                <div class="message-content">
                    <div class="message-bubble">${escapeHtml(messageText)}</div>
                    <div class="message-time">Today at ${timeString}</div>
                </div>
            `;

            messagesContainer.appendChild(messageGroup);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            messageInput.value = '';
            messageInput.style.height = 'auto';

            setTimeout(() => {
                const responseGroup = document.createElement('div');
                responseGroup.className = 'message-group';
                const responseTime = new Date();
                responseTime.setSeconds(responseTime.getSeconds() + 2);
                const responseTimeString = responseTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                const responses = [
                    'Thanks for the message! I\'ll get back to you shortly.',
                    'Great! Let me check my schedule.',
                    'Sounds good to me!',
                    'I\'m available. Let\'s discuss the details.'
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                const workerInitials = document.getElementById('workerName').textContent.split(' ').map(n => n[0]).join('');

                responseGroup.innerHTML = `
                    <div class="message-avatar">${workerInitials}</div>
                    <div class="message-content">
                        <div class="message-bubble">${randomResponse}</div>
                        <div class="message-time">Today at ${responseTimeString}</div>
                    </div>
                `;
                messagesContainer.appendChild(responseGroup);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 2000);
        }

        function selectConversation(element, initials, name) {
            document.querySelectorAll('.conversation-item').forEach(item => item.classList.remove('active'));
            element.classList.add('active');
            document.getElementById('workerName').textContent = name;
            const messagesContainer = document.getElementById('messagesContainer');
            messagesContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">💬</div>
                    <h3>Start a conversation</h3>
                    <p>No messages yet with ${name}</p>
                </div>
            `;
        }

        function callWorker() {
            alert('Initiating call...');
        }

        function viewProfile() {
            window.location.href = 'jobseekerProfile.html';
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }