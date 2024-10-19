export function createStatusBadge(lastMessage){
    let statusBadge = null;

    if (lastMessage) {
        if (lastMessage.direction === 'received' && lastMessage.readStatus === 'unread') {
            const unreadCountDiv = document.createElement('div');
            unreadCountDiv.classList.add('unread-count');
            unreadCountDiv.textContent = '1';
            statusBadge = unreadCountDiv;
        } else if (lastMessage.direction === 'sent') {
            const statusIconSpan = document.createElement('span');
            statusIconSpan.classList.add('material-symbols-outlined');
            if (lastMessage.readStatus === 'unread') {
                statusIconSpan.classList.add('message-status-icon');
                statusIconSpan.textContent = 'check';
            } else if (lastMessage.readStatus === 'read') {
                statusIconSpan.textContent = 'done_all';
            }
            statusBadge = statusIconSpan;
        }
    }
    return statusBadge;
}