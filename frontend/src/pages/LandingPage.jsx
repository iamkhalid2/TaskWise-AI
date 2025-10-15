import React from 'react';
import { Link } from 'react-router';
import { Sparkles, Zap, Shield, CreditCard, ArrowRight, Bot } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
            {/* Hero Section */}
            <div className="hero min-h-screen">
                <div className="hero-content text-center">
                    <div className="max-w-4xl">
                        {/* Logo/Icon */}
                        <div className="flex justify-center gap-3 mb-8">
                            <div className="relative">
                                <Sparkles className="w-20 h-20 text-primary animate-pulse" />
                                <div className="absolute -top-2 -right-2">
                                    <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
                            TaskWise AI
                        </h1>
                        
                        <p className="text-2xl font-semibold text-base-content mb-4">
                            Dual AI Comparison Platform
                        </p>
                        
                        <p className="text-lg text-base-content/70 mb-8 max-w-2xl mx-auto">
                            Get responses from <span className="font-bold text-primary">GPT-4o-mini</span> and{' '}
                            <span className="font-bold text-secondary">Claude 3.5 Sonnet</span> simultaneously.
                            Compare, contrast, and choose the best answer.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link to="/signup" className="btn btn-primary btn-lg gap-2">
                                Get Started Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/login" className="btn btn-outline btn-lg">
                                Sign In
                            </Link>
                        </div>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            <div className="badge badge-lg gap-2 p-4">
                                <Zap className="w-4 h-4" />
                                Instant Responses
                            </div>
                            <div className="badge badge-lg gap-2 p-4">
                                <Shield className="w-4 h-4" />
                                Secure & Private
                            </div>
                            <div className="badge badge-lg gap-2 p-4">
                                <CreditCard className="w-4 h-4" />
                                10 Free Credits
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 px-4 bg-base-200/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        Why Choose <span className="text-primary">TaskWise AI</span>?
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                            <div className="card-body items-center text-center">
                                <div className="bg-primary/10 p-4 rounded-full mb-4">
                                    <Bot className="w-12 h-12 text-primary" />
                                </div>
                                <h3 className="card-title">Dual AI Comparison</h3>
                                <p className="text-base-content/70">
                                    See how different AI models approach the same question. Get diverse perspectives instantly.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                            <div className="card-body items-center text-center">
                                <div className="bg-secondary/10 p-4 rounded-full mb-4">
                                    <Zap className="w-12 h-12 text-secondary" />
                                </div>
                                <h3 className="card-title">Lightning Fast</h3>
                                <p className="text-base-content/70">
                                    Parallel processing means you get both responses in seconds, not minutes.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                            <div className="card-body items-center text-center">
                                <div className="bg-accent/10 p-4 rounded-full mb-4">
                                    <Shield className="w-12 h-12 text-accent" />
                                </div>
                                <h3 className="card-title">Secure & Private</h3>
                                <p className="text-base-content/70">
                                    Your conversations are encrypted and stored securely. We never sell your data.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        How It <span className="text-secondary">Works</span>
                    </h2>
                    
                    <div className="space-y-8">
                        <div className="flex gap-4 items-start">
                            <div className="badge badge-primary badge-lg">1</div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Sign Up & Get Credits</h3>
                                <p className="text-base-content/70">
                                    Create your free account and receive 10 credits to start comparing AI responses.
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex gap-4 items-start">
                            <div className="badge badge-secondary badge-lg">2</div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Ask Your Question</h3>
                                <p className="text-base-content/70">
                                    Type your question in the ChatGPT-style interface. Use 1 credit per question.
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex gap-4 items-start">
                            <div className="badge badge-accent badge-lg">3</div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Compare Responses</h3>
                                <p className="text-base-content/70">
                                    See side-by-side responses from GPT-4o-mini and Claude 3.5 Sonnet instantly.
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex gap-4 items-start">
                            <div className="badge badge-info badge-lg">4</div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Buy More Credits</h3>
                                <p className="text-base-content/70">
                                    Need more? Purchase credits anytime. ₹1 = 10 credits. Simple pricing.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to Experience Dual AI?
                    </h2>
                    <p className="text-lg text-base-content/70 mb-8">
                        Join thousands of users who are already comparing AI responses and making better decisions.
                    </p>
                    <Link to="/signup" className="btn btn-primary btn-lg gap-2">
                        Start Free Today
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer footer-center p-10 bg-base-200 text-base-content">
                <div>
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-primary" />
                        <p className="font-bold text-lg">TaskWise AI</p>
                    </div>
                    <p className="text-sm text-base-content/60">
                        Dual AI Comparison Platform • Made with ❤️
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;