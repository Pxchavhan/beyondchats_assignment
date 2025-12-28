def scrape_oldest_articles(limit=5):
    articles = [
        {"title": "Chatbots Magic: Beginner’s Guidebook",
         "url": "https://beyondchats.com/blogs/introduction-to-chatbots/"},
        {"title": "7 ways a Live Chatbot transforms customer interaction",
         "url": "https://beyondchats.com/blogs/live-chatbot-customer-interaction/"},
        {"title": "7 Clear Indicators Your Business Needs a Virtual Assistant",
         "url": "https://beyondchats.com/blogs/virtual-assistant/"},
        {"title": "10X Your Leads: How Chatbots Revolutionize Lead Generation",
         "url": "https://beyondchats.com/blogs/lead-generation-chatbots/"},
        {"title": "Can Chatbots Boost Small Business Growth?",
         "url": "https://beyondchats.com/blogs/chatbots-for-small-business-growth/"},
    ]
    return articles[:limit]
