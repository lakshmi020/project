import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, Banknote, Smartphone, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  couponCode: string;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountAmount,
  couponCode,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: 'Lakshmi Gajjala',
    phone: '9876543210',
    address: 'Flat 402, Lotus Residency, Road No. 12, Banjara Hills',
    city: 'Hyderabad',
    pinCode: '500034',
    paymentMethod: 'upi' as 'upi' | 'card' | 'cod',
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const totalRaw = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = totalRaw >= 499 ? 0 : 49;
  const finalPayable = Math.max(0, totalRaw - discountAmount + deliveryFee);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const generatedId = `LAURA-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedId);
      setIsProcessing(false);
      setOrderConfirmed(true);
      onOrderSuccess();
    }, 1200);
  };

  const handleFinish = () => {
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full my-6 overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {!orderConfirmed ? (
          <div>
            {/* Header */}
            <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-[#1C1817] text-white">
              <div>
                <h3 className="text-base font-normal font-display tracking-wide">
                  L’Aura Beauté — Secure Dispatch
                </h3>
                <p className="text-xs text-stone-400">
                  Total Payable: <strong className="text-white font-mono">₹{finalPayable}</strong> ({items.length} formulations)
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close checkout"
                className="p-1 text-stone-400 hover:text-white rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitOrder} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Shipping Information */}
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-stone-700" />
                  <span>Doorstep Dispatch Destination</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-stone-600 text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-stone-600 font-mono text-stone-900"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 font-medium mb-1">Complete Address / Street / Residence</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-stone-600 text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-stone-600 text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Postal PIN Code (6 digits)</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={formData.pinCode}
                      onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-stone-600 font-mono text-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-2 border-t border-stone-200">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-stone-700" />
                  <span>Select Payment Channel</span>
                </h4>

                <div className="space-y-2">
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'upi'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                      className="accent-stone-900"
                    />
                    <Smartphone className="w-4 h-4 text-stone-900" />
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-stone-900 block">Instant UPI (Google Pay, PhonePe, Paytm, CRED)</span>
                      <span className="text-[11px] text-stone-500">Fastest confirmation, zero convenience fees</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="accent-stone-900"
                    />
                    <CreditCard className="w-4 h-4 text-stone-900" />
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-stone-900 block">Credit / Debit Card / Net Banking</span>
                      <span className="text-[11px] text-stone-500">Encrypted with 256-bit SSL Banking Protocol</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="accent-stone-900"
                    />
                    <Banknote className="w-4 h-4 text-stone-900" />
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-stone-900 block">Cash on Delivery (Doorstep Verification)</span>
                      <span className="text-[11px] text-stone-500">Pay cash or scan QR with courier upon receipt</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Security Note */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                <div className="flex items-center gap-2 text-stone-600 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span>Authenticity Guarantee · 100% Traceable Bio-Actives</span>
                </div>
                {couponCode && (
                  <p className="text-[11px] text-emerald-800 font-medium">
                    Applied promotion: {couponCode} (-₹{discountAmount})
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white rounded-md text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                {isProcessing ? (
                  <span>Securing Order Details...</span>
                ) : (
                  <>
                    <span>Confirm Order &amp; Dispatch · ₹{finalPayable}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-stone-100 text-stone-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-stone-300">
              <CheckCircle className="w-8 h-8 text-emerald-700" />
            </div>

            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
              Acquisition Confirmed
            </span>
            <h3 className="text-2xl font-normal text-stone-900 font-display mt-1 mb-2">
              Thank You, {formData.name.split(' ')[0]}
            </h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto mb-6">
              Your order <strong className="text-stone-950 font-mono">#{orderNumber}</strong> has been allocated and is being packaged in recyclable amber glass and organic cotton wrapping.
            </p>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-left text-xs mb-6 space-y-2">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Estimated Delivery:</span>
                <span className="font-semibold text-stone-900">Within 24–48 Hours</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Destination:</span>
                <span className="font-semibold text-stone-900 text-right max-w-[200px] truncate">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Payment Channel:</span>
                <span className="font-semibold text-stone-900 uppercase font-mono">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm text-stone-950 font-mono">
                <span>Total Amount:</span>
                <span>₹{finalPayable}</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Continue Exploring The Vault
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
