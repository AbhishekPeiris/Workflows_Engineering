import React, { useState, useEffect } from 'react';
import "./ptfdIndex.css";
import NavV2 from '../Nav/NavV2';
import Footer from '../Nav/ptfdFooter'; // Import the ptfdFooter component
import { useNavigate } from 'react-router-dom';

// Hero Banner Component
const HeroBanner = () => {
    const navigate = useNavigate();
    const [currentKeyword, setCurrentKeyword] = useState(0);
    const rotatingKeywords = ['Engineering', 'Innovation', 'Sustainability', 'Excellence', 'Quality'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentKeyword((prev) => (prev + 1) % rotatingKeywords.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [rotatingKeywords.length]); // Added missing dependency

    return (
        <section className="ptfd-hero-section">
            <div className="ptfd-hero-video-container">
                <video
                    className="ptfd-hero-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="https://www.pexels.com/download/video/4878904/" type="video/mp4" />
                </video>
                <div className="ptfd-hero-overlay"></div>
            </div>

            <div className="ptfd-hero-content">
                <div className="ptfd-hero-text-container">
                    <h1 className="ptfd-hero-title">
                        Building Tomorrow&apos;s
                        <br />
                        Infrastructure Today
                    </h1>

                    <p className="ptfd-hero-description">
                        Leading construction and engineering solutions that transform visions into reality through innovative design and sustainable practices.
                    </p>

                    <div className="ptfd-rotating-keyword">
                        <span className="ptfd-keyword-badge">
                            {rotatingKeywords[currentKeyword]}
                        </span>
                    </div>

                    <button onClick={() => navigate("/projects")} className="ptfd-hero-button">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
};

// Construction Introduction Component
const ConstructionIntro = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const carouselImages = [
        {
            url: "https://c.animaapp.com/mfwtmt56xCUZ08/img/ai_2.png",
            alt: "engineering design"
        },
        {
            url: "https://c.animaapp.com/mfwtmt56xCUZ08/img/ai_3.png",
            alt: "completed project"
        },
        {
            url: "https://c.animaapp.com/mfwtmt56xCUZ08/img/ai_4.png",
            alt: "timeline progress"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % carouselImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [carouselImages.length]); // Added missing dependency

    return (
        <section className="ptfd-construction-section">
            {/* <div className="ptfd-section-background" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url("https://c.animaapp.com/mfwtmt56xCUZ08/img/ai_1.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.1,
                zIndex: 0
            }}></div> */}
            <div className="ptfd-construction-container">
                <div className="ptfd-construction-grid">
                    <div className="ptfd-construction-text">
                        <h2 className="ptfd-construction-title">
                            What is <span className="title-highlight">Construction</span> Excellence?
                        </h2>
                        <p className="ptfd-construction-paragraph">
                            Construction excellence is more than building structures—it's about creating lasting value through innovative engineering, sustainable practices, and unwavering commitment to quality.
                        </p>
                        <p className="ptfd-construction-paragraph">
                            Our approach combines cutting-edge technology with time-tested craftsmanship, ensuring every project meets the highest standards of safety, efficiency, and environmental responsibility.
                        </p>
                        <p className="ptfd-construction-paragraph">
                            From initial design to final delivery, we partner with clients to transform ambitious visions into remarkable realities that stand the test of time.
                        </p>
                    </div>

                    <div className="ptfd-construction-carousel" title="Click to view larger image">
                        {carouselImages.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={image.alt}
                                className={`ptfd-carousel-image ${currentImage === index ? 'ptfd-active' : ''}`}
                                loading="lazy"
                            />
                        ))}
                        <div className="ptfd-hover-overlay">
                            <span className="ptfd-hover-text">🔍 View Details</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Projects Introduction Component
const ProjectsIntro = () => {
    const projectTypes = [
        {
            icon: '🏢',
            title: 'Commercial Buildings',
            description: 'Modern office complexes and retail spaces designed for efficiency and sustainability.'
        },
        {
            icon: '🔧',
            title: 'Infrastructure',
            description: 'Roads, bridges, and utilities that connect communities and drive economic growth.'
        },
        {
            icon: '⚡',
            title: 'Industrial Facilities',
            description: 'Manufacturing plants and warehouses built for optimal operational performance.'
        }
    ];

    return (
        <section className="ptfd-projects-section">
            <div className="ptfd-projects-video-container">
                <video
                    className="ptfd-projects-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="https://www.pexels.com/download/video/18415150/" type="video/mp4" />
                </video>
                <div className="ptfd-projects-overlay"></div>
            </div>

            <div className="ptfd-projects-content">
                <div className="ptfd-projects-header">
                    <h2 className="ptfd-projects-title">
                        Our <span className="title-highlight">Project</span> Portfolio
                    </h2>
                    <p className="ptfd-projects-description">
                        From groundbreaking commercial developments to critical infrastructure projects, we deliver exceptional results across diverse construction sectors.
                    </p>
                    <button className="ptfd-projects-button">
                        View All Projects
                    </button>
                </div>

                <div className="ptfd-projects-grid">
                    {projectTypes.map((project, index) => (
                        <div key={index} className="ptfd-project-card">
                            <div className="ptfd-project-icon">{project.icon}</div>
                            <h3 className="ptfd-project-title">{project.title}</h3>
                            <p className="ptfd-project-description">{project.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Timeline Introduction Component
const TimelineIntro = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const timelineSteps = [
        {
            icon: '📅',
            title: 'Planning & Design',
            description: 'Comprehensive project planning and architectural design phase.'
        },
        {
            icon: '⏰',
            title: 'Construction',
            description: 'Efficient execution with real-time progress monitoring.'
        },
        {
            icon: '✅',
            title: 'Completion',
            description: 'Quality assurance and project handover to client.'
        }
    ];

    const nextStep = () => {
        setCurrentStep((prev) => (prev + 1) % timelineSteps.length);
    };

    const prevStep = () => {
        setCurrentStep((prev) => (prev - 1 + timelineSteps.length) % timelineSteps.length);
    };

    return (
        <section className="ptfd-timeline-section">
            <div className="ptfd-timeline-container">
                <div className="ptfd-timeline-grid">
                    <div className="ptfd-timeline-text">
                        <h2 className="ptfd-timeline-title">
                            <span className="title-highlight">Project</span> Timeline Management
                        </h2>
                        <p className="ptfd-timeline-paragraph">
                            Our advanced project management system ensures every milestone is met on schedule. Track progress in real-time and stay informed throughout the entire construction process.
                        </p>
                        <p className="ptfd-timeline-paragraph">
                            From initial planning to final delivery, our streamlined approach minimizes delays and maximizes efficiency, giving you complete visibility into your project's progress.
                        </p>
                        <button className="ptfd-timeline-button">
                            View Timeline Dashboard
                        </button>
                    </div>

                    <div className="ptfd-timeline-display">
                        <div className="ptfd-timeline-background" title="Click to view larger image">
                            <img
                                src="https://images.pexels.com/photos/325944/pexels-photo-325944.jpeg"
                                alt="timeline progress"
                                className="ptfd-timeline-bg-image"
                                loading="lazy"
                            />
                            <div className="ptfd-hover-overlay">
                                <span className="ptfd-hover-text">🔍 View Timeline</span>
                            </div>
                        </div>

                        <div className="ptfd-timeline-card">
                            <div className="ptfd-timeline-step-content">
                                <div className="ptfd-timeline-icon">
                                    {timelineSteps[currentStep].icon}
                                </div>
                                <h3 className="ptfd-timeline-step-title">
                                    {timelineSteps[currentStep].title}
                                </h3>
                                <p className="ptfd-timeline-step-description">
                                    {timelineSteps[currentStep].description}
                                </p>
                            </div>

                            <div className="ptfd-timeline-navigation">
                                <button onClick={prevStep} className="ptfd-timeline-nav-btn">
                                    ←
                                </button>

                                <div className="ptfd-timeline-indicators">
                                    {timelineSteps.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentStep(index)}
                                            className={`ptfd-timeline-indicator ${currentStep === index ? 'ptfd-active' : ''}`}
                                        />
                                    ))}
                                </div>

                                <button onClick={nextStep} className="ptfd-timeline-nav-btn">
                                    →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Enhanced Growth of Construction Component with Stats Cards
const GrowthConstruction = () => {
    const chartData = [
        { year: '2021', growth: 5.7 },
        { year: '2022', growth: 6.0 },
        { year: '2023', growth: 6.6 },
        { year: '2024', growth: 10.0 },
        { year: '2025', growth: 5.5 },
    ];

    const statsCards = [
        {
            icon: '📈',
            title: "Annual Growth Rate",
            value: "10.2%",
            description: "Industry leading growth",
            color: "text-green-600"
        },
        {
            icon: '👥',
            title: "Jobs Created",
            value: "2.4M+",
            description: "New opportunities nationwide",
            color: "text-blue-600"
        },
        {
            icon: '💵',
            title: "Market Value",
            value: "$1.8T",
            description: "Total market valuation",
            color: "text-amber-600"
        },
        {
            icon: '🏗️',
            title: "Projects Delivered",
            value: "45K+",
            description: "Successful completions",
            color: "text-purple-600"
        }
    ];

    const maxGrowth = Math.max(...chartData.map(d => d.growth));

    return (
        <section className="ptfd-growth-section">
            {/* Fixed Background Video with Hover Effects */}
            <div className="ptfd-growth-video-container">
                <video
                    className="ptfd-growth-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="https://c.animaapp.com/mfwtmt56xCUZ08/img/ai_1.mp4" type="video/mp4" />
                </video>
                <div className="ptfd-growth-overlay"></div>
            </div>

            <div className="ptfd-growth-container">
                <div className="ptfd-growth-header">
                    <h2 className="ptfd-growth-title">
                        Growth in <span className="title-highlight">Construction</span>
                    </h2>
                    <p className="ptfd-growth-description">
                        Witness the exponential growth in the construction industry, driven by innovation, sustainability, and advanced engineering practices.
                    </p>
                </div>

                {/* Stats Cards Grid */}
                <div className="ptfd-growth-stats-grid">
                    {statsCards.map((stat, index) => (
                        <div key={index} className="ptfd-growth-stat-card">
                            <div className="ptfd-growth-stat-content">
                                <div className="ptfd-growth-stat-icon">
                                    {stat.icon}
                                </div>
                                <h3 className="ptfd-growth-stat-title">{stat.title}</h3>
                                <div className="ptfd-growth-stat-value">{stat.value}</div>
                                <p className="ptfd-growth-stat-description">{stat.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Chart Container */}
                <div className="ptfd-growth-chart-container">
                    <div className="ptfd-growth-chart-content">
                        {chartData.map((data, index) => (
                            <div key={index} className="ptfd-growth-chart-bar-container">
                                <span className="ptfd-growth-chart-value">{data.growth}%</span>
                                <div 
                                    className="ptfd-growth-bar"
                                    style={{
                                        '--bar-height': `${(data.growth / maxGrowth) * 200}px`, // Adjusted to 200 for better fit
                                        '--index': index
                                    }}
                                ></div>
                                <span className="ptfd-growth-chart-year">{data.year}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// New Safety and Innovation Component
const SafetyInnovation = () => {
    const cards = [
        {
            image: 'https://images.pexels.com/photos/209230/pexels-photo-209230.jpeg',
            title: 'Safety Protocols',
            description: 'Implementing cutting-edge safety measures to protect our workforce and ensure project success.'
        },
        {
            image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg',
            title: 'Innovative Technologies',
            description: 'Utilizing AI, IoT, and advanced materials to revolutionize construction processes.'
        },
        {
            image: 'https://images.pexels.com/photos/325944/pexels-photo-325944.jpeg',
            title: 'Sustainable Practices',
            description: 'Adopting eco-friendly methods to minimize environmental impact while maximizing efficiency.'
        }
    ];

    return (
        <section className="ptfd-safety-section">
            <div className="ptfd-safety-container">
                <h2 className="ptfd-safety-title">
                    Safety and <span className="title-highlight">Innovation</span>
                </h2>
                <p className="ptfd-timeline-paragraph">
                    Building smarter, safer, and more efficient construction workflows. 
                    Our platform combines advanced technology with practical solutions to streamline project management, 
                    enhance workplace safety, and drive continuous innovation. Designed for teams who value precision,
                     reliability, and forward-thinking practices, we empower organizations to deliver projects on time, 
                     on budget, and without compromise on safety.</p><br />
                <div className="ptfd-safety-grid">
                    {cards.map((card, index) => (
                        <div key={index} className="ptfd-safety-card">
                            <img src={card.image} alt={card.title} className="ptfd-safety-card-image" />
                            <div className="ptfd-safety-card-content">
                                <h3 className="ptfd-safety-card-title">{card.title}</h3>
                                <p className="ptfd-safety-card-description">{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Financial Dashboard Introduction Component
const FinancialDashboardIntro = () => {
    const [currentFeature, setCurrentFeature] = useState(0);
    const dashboardFeatures = [
        {
            icon: '💰',
            title: 'Budget Tracking',
            description: 'Real-time budget monitoring with detailed cost breakdowns and variance analysis.'
        },
        {
            icon: '📈',
            title: 'Financial Forecasting',
            description: 'Predictive analytics for accurate project cost estimation and resource planning.'
        },
        {
            icon: '📊',
            title: 'Performance Metrics',
            description: 'Comprehensive financial KPIs and ROI analysis for informed decision making.'
        }
    ];

    const nextFeature = () => {
        setCurrentFeature((prev) => (prev + 1) % dashboardFeatures.length);
    };

    const prevFeature = () => {
        setCurrentFeature((prev) => (prev - 1 + dashboardFeatures.length) % dashboardFeatures.length);
    };

    return (
        <section className="ptfd-dashboard-section">
            <div className="ptfd-dashboard-video-container">
                <video
                    className="ptfd-dashboard-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="https://c.animaapp.com/mfwtmt56xCUZ08/img/ai_1.mp4" type="video/mp4" />
                </video>
                <div className="ptfd-dashboard-overlay"></div>
            </div>

            <div className="ptfd-dashboard-content">
                <div className="ptfd-dashboard-container">
                    <div className="ptfd-dashboard-grid">
                        <div className="ptfd-dashboard-display">
                            <div className="ptfd-dashboard-background" title="Click to view larger image">
                                <img
                                    src="https://c.animaapp.com/mfwtmt56xCUZ08/img/ai_5.png"
                                    alt="financial dashboard"
                                    className="ptfd-dashboard-bg-image"
                                    loading="lazy"
                                />
                                <div className="ptfd-hover-overlay">
                                    <span className="ptfd-hover-text">🔍 View Dashboard</span>
                                </div>
                            </div>

                            <div className="ptfd-dashboard-card">
                                <div className="ptfd-dashboard-feature-content">
                                    <div className="ptfd-dashboard-icon">
                                        {dashboardFeatures[currentFeature].icon}
                                    </div>
                                    <h3 className="ptfd-dashboard-feature-title">
                                        {dashboardFeatures[currentFeature].title}
                                    </h3>
                                    <p className="ptfd-dashboard-feature-description">
                                        {dashboardFeatures[currentFeature].description}
                                    </p>
                                </div>

                                <div className="ptfd-dashboard-navigation">
                                    <button onClick={prevFeature} className="ptfd-dashboard-nav-btn">
                                        ←
                                    </button>

                                    <div className="ptfd-dashboard-indicators">
                                        {dashboardFeatures.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentFeature(index)}
                                                className={`ptfd-dashboard-indicator ${currentFeature === index ? 'ptfd-active' : ''}`}
                                            />
                                        ))}
                                    </div>

                                    <button onClick={nextFeature} className="ptfd-dashboard-nav-btn">
                                        →
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="ptfd-dashboard-text">
                            <h2 className="ptfd-dashboard-title">
                                Financial <span className="title-highlight">Dashboard</span>
                            </h2>
                            <p className="ptfd-dashboard-paragraph">
                                Take control of your project finances with our comprehensive dashboard. Monitor budgets, track expenses, and analyze financial performance in real-time.
                            </p>
                            <p className="ptfd-dashboard-paragraph">
                                Our advanced analytics provide insights into cost trends, helping you make informed decisions and optimize resource allocation throughout the project lifecycle.
                            </p>
                            <p className="ptfd-dashboard-paragraph">
                                From initial budget planning to final cost analysis, our dashboard ensures complete financial transparency and accountability.
                            </p>
                            <button className="ptfd-dashboard-button">
                                Access Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Updated Chatbot Premium Component to match Projecto AI
const ProjectoAIPremium = () => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="ptfd-chatbot-section">
            {/* <div className="ptfd-section-background" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url("https://c.animaapp.com/mfwtmt56xCUZ08/img/ai_5.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.1,
                zIndex: 0
            }}></div> */}
            <div className="ptfd-chatbot-container">
                <div className="ptfd-chatbot-header">
                    <h2 className="ptfd-chatbot-title">
                        Projecto AI <span className="title-highlight">Assistant</span>
                    </h2>
                    <p className="ptfd-chatbot-description">
                        Get instant answers to your construction questions with Projecto AI. Available 24/7 to help with project planning, cost estimation, and technical guidance.
                    </p>
                </div>

                <div className="ptfd-chatbot-card">
                    <div className="ptfd-chatbot-card-header">
                        <div className="ptfd-chatbot-info">
                            <div className="ptfd-chatbot-avatar">
                                🏗️
                            </div>
                            <div className="ptfd-chatbot-details">
                                <h3 className="ptfd-chatbot-name">
                                    Projecto AI
                                </h3>
                                <p className="ptfd-chatbot-status">Premium Support Available</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="ptfd-chatbot-toggle"
                        >
                            {isExpanded ? '−' : '+'}
                        </button>
                    </div>

                    <div className={`ptfd-chatbot-content ${isExpanded ? 'ptfd-expanded' : ''}`}>
                        <div className="ptfd-chatbot-messages">
                            <div className="ptfd-chatbot-message ptfd-bot-message">
                                <p>👋 Hello! I'm Projecto AI, your construction assistant. How can I help you today?</p>
                            </div>
                            <div className="ptfd-chatbot-message ptfd-user-message">
                                <p>What's the typical timeline for a commercial building project?</p>
                            </div>
                            <div className="ptfd-chatbot-message ptfd-bot-message">
                                <p>Commercial building timelines typically range from 12-24 months, depending on size and complexity. I can provide a detailed breakdown based on your specific requirements.</p>
                            </div>
                        </div>

                        {isExpanded && (
                            <div className="ptfd-chatbot-expanded-content">
                                <div className="ptfd-chatbot-quick-actions">
                                    <button className="ptfd-chatbot-quick-btn">Cost Estimation</button>
                                    <button className="ptfd-chatbot-quick-btn">Project Planning</button>
                                    <button className="ptfd-chatbot-quick-btn">Material Selection</button>
                                </div>
                                <div className="ptfd-chatbot-input-area">
                                    <input
                                        type="text"
                                        placeholder="Ask Projecto AI anything about construction..."
                                        className="ptfd-chatbot-input"
                                    />
                                    <button onClick={() => navigate("/chatbot")} className="ptfd-chatbot-send-btn">Send</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Future CTA Component
const FutureCTA = () => {
    return (
        <section className="ptfd-cta-section">
            <div className="ptfd-cta-video-container">
                <video
                    className="ptfd-cta-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="https://www.pexels.com/download/video/8319972/" type="video/mp4" />
                </video>
                <div className="ptfd-cta-overlay"></div>
            </div>

            <div className="ptfd-cta-content-wrapper">
                <div className="ptfd-cta-container">
                    <div className="ptfd-cta-content">
                        <h2 className="ptfd-cta-title">
                            Ready to <span className="title-highlight">Build</span> The future ?
                        </h2>
                        <p className="ptfd-cta-description">
                            Transform your vision into reality with our comprehensive construction and engineering solutions. From innovative design to sustainable execution, we're your partner in creating tomorrow's infrastructure today.
                        </p>

                        <div className="ptfd-cta-buttons">
                            <button className="ptfd-cta-primary-btn">
                                Start Your Project
                            </button>
                            <button className="ptfd-cta-secondary-btn">
                                Schedule Consultation
                            </button>
                        </div>
                    </div>

                    <div className="ptfd-cta-stats">
                        <div className="ptfd-cta-stat">
                            <div className="ptfd-cta-stat-number">500+</div>
                            <div className="ptfd-cta-stat-label">Projects Completed</div>
                        </div>
                        <div className="ptfd-cta-stat">
                            <div className="ptfd-cta-stat-number">25+</div>
                            <div className="ptfd-cta-stat-label">Years Experience</div>
                        </div>
                        <div className="ptfd-cta-stat">
                            <div className="ptfd-cta-stat-number">98%</div>
                            <div className="ptfd-cta-stat-label">Client Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Main Homepage Component
const ConstructionHomepage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="ptfd-homepage">
            <NavV2 />
            <HeroBanner />
            <ConstructionIntro />
            <ProjectsIntro />
            <TimelineIntro />
            <GrowthConstruction />
            <SafetyInnovation />
            <FinancialDashboardIntro />
            <ProjectoAIPremium />
            <FutureCTA />
            <Footer />
        </div>
    );
};

export default ConstructionHomepage;