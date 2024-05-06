

exports.getToken = (context) => {
    let sid = context.ACCOUNT_SID;
    let auth = context.AUTH_TOKEN;
    if (sid != null && auth != null) {
        return sid + auth;
    }
    return "";
}

exports.cleanReply = (reply) => {
    return reply.trim().replaceAll("  ", " ");
}
  
exports.isAdmin = (fromNumber, adminNumbers) => {
    // is this message is from an admin?
    for (let i = 0; i < adminNumbers.length; i++) {
        let adminNum = adminNumbers[i];
        adminNum = adminNum.replaceAll("(", "").
            replaceAll(")", "").
            replaceAll("-", "").
            replaceAll(" ", "");
        if (adminNum.length > 9 && fromNumber.indexOf(adminNum) > -1) {
            return true;
        }
    };
    return false;
}
  
exports.promptStep1SingleGroup = (group) => {
    let plurality = group.members == 1 ? "person" : "people";
    return `Let's send a new message to the ${group.members} ${plurality} in the group, ${group.name}.
    
Start over anytime by replying "start over" or "new."
    
How would you like to greet them? Reply with "hello", "good morning", or another greeting.`;
}
  
exports.promptStep1MultiGroups = (groups) => {
    let groupStr = "";
    for (let i = 0; i < groups.length; i++) {
      groupStr += `\n${groups[i].id} – ${groups[i].name}`;
    }
  
    return `Which group would you like to message?\n${groupStr}
    
Start over anytime by replying "start over" or "new."`;
}
  
exports.promptStep2Greeting = () => {
    return `How would you like to greet them? Reply with "hello", "good morning", or another greeting.`;
}
  
exports.promptStep3Body = (group) => {
    let plurality = group.members == 1 ? "person" : "people";
    return `What's the message you would like to send to the ${group.members} ${plurality} in the group, ${group.name}?`;
}
  
exports.promptStep4ForwardingOption = () => {
    return `Would you like responses forwarded to you?`;
}
  
exports.promptStep5FinalReview = (message) => {
    return `Ok, your message looks like this:\n\n"${message}"
    
Reply "send" to deliver the message or "new" to start over.`;
}

exports.promptStep5FinalReviewWithSchedulingOption = (message) => {
    return `Ok, your message looks like this:\n\n"${message}"
    
When would you like this message sent? Reply with "now", "tonight at 6:00", "tomorrow morning", etc. Or, reply "new" to start over.`;
}

exports.promptClarify = (clarification) => {
    return clarification;
}
  
exports.promptSent = () => {
    return `Your message has been sent!`;
}
  
exports.promptQueued = (friendlySchedule) => {
    if (friendlySchedule == null) { // assume it was not scheduled
        return `Your message is on its way!`;
    }
    return `Ok, your message will be sent ${friendlySchedule}.`;
}