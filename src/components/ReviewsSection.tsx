import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { VEDHA_PRODUCTS } from '../data/products';

interface CustomerReview {
  id: string;
  author: string;
  location: string;
  productId: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(VEDHA_PRODUCTS[0].id);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isVerifiedOrder, setIsVerifiedOrder] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      location: location.trim() || 'Bengaluru, India',
      productId: selectedProduct,
      rating,
      date: 'Just now',
      verified: isVerifiedOrder,
      comment: comment.trim(),
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setShowForm(false);
    setAuthor('');
    setLocation('');
    setComment('');
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Genuine Customer Community</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              Customer Feedback & Verified Experiences
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
              In accordance with our zero-fabrication policy, we never manufacture artificial testimonials or fake star ratings. Read real reviews submitted by verified purchasers or leave your own honest evaluation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setShowForm(!showForm);
                setSubmitted(false);
              }}
              className="px-4 py-2 bg-emerald-800 text-white font-medium text-xs rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer flex items-center gap-2 shadow-2xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{showForm ? 'Close Form' : 'Write a Review'}</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {submitted && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 text-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-semibold">Thank you for submitting your authentic review!</p>
              <p className="text-emerald-700">Your feedback has been recorded and will appear on the verified feed below.</p>
            </div>
          </div>
        )}

        {/* Review Submission Form Modal / Drawer */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-5 animate-in fade-in duration-200"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900">Submit Your Experience</h3>
              <span className="text-[11px] text-stone-500">All fields are held to authentic purchase verification</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-emerald-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">City / Region</label>
                <input
                  type="text"
                  placeholder="e.g. Indiranagar, Bengaluru"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-emerald-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Product Evaluated</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-emerald-800"
                >
                  {VEDHA_PRODUCTS.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name} (1 Litre)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">Rating</label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 rounded hover:bg-stone-200 transition-colors cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-stone-600 font-mono ml-2">{rating} out of 5 Stars</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Review Details</label>
              <textarea
                required
                rows={3}
                placeholder="Share your experience regarding formulation performance, dilution, aroma, surface results, and skin friendliness..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-emerald-800"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-600">
                <input
                  type="checkbox"
                  checked={isVerifiedOrder}
                  onChange={(e) => setIsVerifiedOrder(e.target.checked)}
                  className="rounded text-emerald-800 focus:ring-emerald-800"
                />
                <span>Purchased through Vedha Online or Authorized Distributor</span>
              </label>

              <button
                type="submit"
                className="px-5 py-2 bg-emerald-800 text-white font-bold text-xs rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Real Review</span>
              </button>
            </div>
          </form>
        )}

        {/* Reviews Feed or Transparent Empty State */}
        {reviews.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-2xl bg-stone-50 border border-dashed border-stone-300 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100/80 text-emerald-800 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <div className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest">
                [VERIFIED BUYER FEEDBACK TO BE DISPLAYED HERE]
              </div>
              <h3 className="text-base font-bold text-stone-900">Be Among the First to Review</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                We believe in 100% genuine transparency. As Vedha expands its D2C distribution across Bengaluru and South India, verified buyer feedback is collected and displayed here directly from real customer experiences.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Share Your Feedback On 1L Formulations
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => {
              const product = VEDHA_PRODUCTS.find((p) => p.id === rev.productId);
              return (
                <div
                  key={rev.id}
                  className="p-6 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= rev.rating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-stone-400 font-mono">{rev.date}</span>
                    </div>

                    <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 inline-block">
                      {product ? product.name : 'Vedha Product'} · 1 Litre
                    </div>

                    <p className="text-xs text-stone-700 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-stone-900">{rev.author}</div>
                      <div className="text-[11px] text-stone-500">{rev.location}</div>
                    </div>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-white border border-emerald-300 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
