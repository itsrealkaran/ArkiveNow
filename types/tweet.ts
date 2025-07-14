export interface User {
    id: string
    displayName?: string
    name?: string
    username?: string
    screen_name?: string
    avatar?: string
    profile_image_url?: string
    verification?: "verified" | "business" | "government"
    verified?: boolean
  }
  
  export interface Media {
    id: string
    type: "photo" | "video" | "gif" | "image"
    url: string
    preview_url?: string
    preview_image_url?: string
    alt_text?: string
    alt?: string
    width?: number
    height?: number
  }
  
  export interface LinkPreview {
    url: string
    title: string
    description?: string
    image?: string
    domain: string
  }
  
  export interface Engagement {
    replies?: number
    retweets?: number
    likes?: number
    shares?: number
  }
  
  export interface PublicMetrics {
    reply_count?: number
    retweet_count?: number
    like_count?: number
    quote_count?: number
  }
  
  export interface Tweet {
    id: string
    type?: string
    text?: string
    content?: string
    timestamp?: string
    created_at?: string
    user?: User
    author?: User
    author_id?: string
    media?: Media[]
    link_previews?: LinkPreview[]
    quoted_tweet?: Tweet
    referenced_tweets?: Array<{
      type: "quoted" | "replied_to" | "retweeted"
      id: string
    }>
    includes?: {
      tweets?: Tweet[]
      media?: Media[]
    }
    engagement?: Engagement
    public_metrics?: PublicMetrics
    entities?: {
      urls?: Array<{
        url: string
        preview?: LinkPreview
      }>
    }
    attachments?: {
      media_keys?: string[]
    }
  }
  
  export const sampleTweets: Tweet[] = [
    {
      id: "1",
      type: "Text Only Tweet",
      text: "Just shipped a new feature! 🚀 Really excited about the improvements to user experience. What do you think about the new design patterns we're seeing in 2024? #WebDev #UX",
      timestamp: "2h",
      user: {
        id: "user1",
        displayName: "Sarah Chen",
        username: "sarahchen_dev",
        avatar: "/placeholder.svg?height=40&width=40",
        verification: "verified",
      },
      engagement: {
        replies: 24,
        retweets: 156,
        likes: 892,
        shares: 12,
      },
    },
    {
      id: "2",
      type: "Tweet with Single Image",
      text: "Beautiful sunset from my office window today 🌅 Sometimes you need to pause and appreciate the simple moments.",
      timestamp: "4h",
      user: {
        id: "user2",
        displayName: "Alex Rodriguez",
        username: "alexr_photo",
        avatar: "/placeholder.svg?height=40&width=40",
        verification: "business",
      },
      media: [
        {
          id: "media1",
          type: "photo",
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
          alt_text: "Beautiful sunset view from office window",
        },
      ],
      engagement: {
        replies: 45,
        retweets: 234,
        likes: 1567,
        shares: 89,
      },
    },
    {
      id: "3",
      type: "Tweet with Multiple Images",
      text: "Amazing day at the tech conference! Here are some highlights from the keynote presentations. The future of AI is looking incredible! 🤖✨",
      timestamp: "6h",
      user: {
        id: "user3",
        displayName: "Tech Conference",
        username: "techconf2024",
        avatar: "/placeholder.svg?height=40&width=40",
        verification: "business",
      },
      media: [
        {
          id: "media2",
          type: "photo",
          url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop",
          alt_text: "Conference keynote stage",
        },
        {
          id: "media3",
          type: "photo",
          url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=200&fit=crop",
          alt_text: "Audience at tech conference",
        },
        {
          id: "media4",
          type: "photo",
          url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop",
          alt_text: "Tech conference networking area",
        },
      ],
      engagement: {
        replies: 78,
        retweets: 445,
        likes: 2134,
        shares: 156,
      },
    },
    {
      id: "4",
      type: "Tweet with Video",
      text: "Quick demo of our new animation library! 🎬 This makes creating smooth transitions so much easier for developers.",
      timestamp: "8h",
      user: {
        id: "user4",
        displayName: "DevTools Inc",
        username: "devtools_inc",
        avatar: "/placeholder.svg?height=40&width=40",
        verification: "business",
      },
      media: [
        {
          id: "media5",
          type: "video",
          url: "https://example.com/demo-video.mp4",
          preview_image_url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop",
          alt_text: "Animation library demo video",
        },
      ],
      engagement: {
        replies: 92,
        retweets: 567,
        likes: 3421,
        shares: 234,
      },
    },
    {
      id: "5",
      type: "Tweet with Link Preview",
      text: "This article perfectly explains the new React patterns we should all be using in 2024. Highly recommended read! 📚",
      timestamp: "12h",
      user: {
        id: "user5",
        displayName: "React Community",
        username: "react_community",
        avatar: "/placeholder.svg?height=40&width=40",
        verification: "verified",
      },
      link_previews: [
        {
          url: "https://example.com/react-patterns-2024",
          title: "Modern React Patterns: A Complete Guide for 2024",
          description:
            "Explore the latest React patterns including Server Components, Suspense, and advanced hooks that will make your applications more performant and maintainable.",
          image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=250&fit=crop",
          domain: "reactpatterns.dev",
        },
      ],
      engagement: {
        replies: 156,
        retweets: 789,
        likes: 4567,
        shares: 345,
      },
    },
    {
      id: "6",
      type: "Tweet with Quoted Tweet",
      text: "This is exactly what I was talking about! The attention to detail in modern web design is incredible.",
      timestamp: "1d",
      user: {
        id: "user6",
        displayName: "Design Guru",
        username: "design_guru",
        avatar: "/placeholder.svg?height=40&width=40",
        verification: "verified",
      },
      quoted_tweet: {
        id: "quoted1",
        text: "Just launched our new website redesign! Clean, minimal, and blazing fast ⚡️",
        user: {
          id: "quoted_user1",
          displayName: "Startup Co",
          username: "startup_co",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        media: [
          {
            id: "quoted_media1",
            type: "photo",
            url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
            alt_text: "Modern website design screenshot",
          },
        ],
      },
      engagement: {
        replies: 67,
        retweets: 234,
        likes: 1456,
        shares: 89,
      },
    },
    {
      id: "7",
      type: "Tweet with GIF",
      text: "When your code finally works after hours of debugging 😅",
      timestamp: "2d",
      user: {
        id: "user7",
        displayName: "Code Memes",
        username: "code_memes",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      media: [
        {
          id: "media6",
          type: "gif",
          url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
          alt_text: "Celebration GIF",
        },
      ],
      engagement: {
        replies: 234,
        retweets: 1234,
        likes: 5678,
        shares: 456,
      },
    },
    {
      id: "8",
      type: "Complex Tweet with Everything",
      text: "Excited to announce our new AI-powered development tools! 🤖\n\nKey features:\n• Smart code completion\n• Automated testing\n• Performance optimization\n\nRead more about it here: https://example.com/ai-tools\n\n#AI #DevTools #Innovation",
      timestamp: "3d",
      user: {
        id: "user8",
        displayName: "AI Innovations",
        username: "ai_innovations",
        avatar: "/placeholder.svg?height=40&width=40",
        verification: "business",
      },
      media: [
        {
          id: "media7",
          type: "photo",
          url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop",
          alt_text: "AI development tools interface",
        },
        {
          id: "media8",
          type: "video",
          url: "https://example.com/ai-demo.mp4",
          preview_image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
          alt_text: "AI tools demo video",
        },
      ],
      link_previews: [
        {
          url: "https://example.com/ai-tools",
          title: "Revolutionary AI Development Tools - Transform Your Workflow",
          description:
            "Discover how our AI-powered tools can increase your development productivity by 300%. Smart completion, automated testing, and intelligent optimization.",
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=250&fit=crop",
          domain: "ai-innovations.com",
        },
      ],
      engagement: {
        replies: 345,
        retweets: 1567,
        likes: 8901,
        shares: 678,
      },
    },
  ]
  