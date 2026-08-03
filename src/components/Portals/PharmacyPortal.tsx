import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Pill,
  Search,
  ShoppingCart,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const PharmacyPortal: React.FC = () => {
  const { prescriptions, openAIModal } = useHospital();

  const [inventory] = useState([
    { id: 'd1', name: 'Amoxicillin 500mg', category: 'Antibiotic', stock: 450, unitPrice: 0.8, reorderLevel: 100 },
    { id: 'd2', name: 'Paracetamol 500mg', category: 'Analgesic', stock: 80, unitPrice: 0.2, reorderLevel: 150 },
    { id: 'd3', name: 'Metformin 850mg', category: 'Antidiabetic', stock: 620, unitPrice: 0.5, reorderLevel: 100 },
    { id: 'd4', name: 'Atorvastatin 20mg', category: 'Cardiovascular', stock: 210, unitPrice: 1.2, reorderLevel: 50 },
  ]);

  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<{ drugName: string; qty: number; price: number }[]>([]);
  const [dispenseSuccess, setDispenseSuccess] = useState('');

  const filtered = (inventory || []).filter(
    (item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (item: typeof inventory[0]) => {
    const existing = cart.find((c) => c.drugName === item.name);
    if (existing) {
      setCart(cart.map((c) => (c.drugName === item.name ? { ...c, qty: c.qty + 1 } : c)));
    } else {
      setCart([...cart, { drugName: item.name, qty: 1, price: item.unitPrice }]);
    }
  };

  const totalBill = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleDispense = () => {
    if (cart.length === 0) return;
    setDispenseSuccess(`Pharmacy POS Order billed successfully! Total: $${totalBill.toFixed(2)}`);
    setCart([]);
    setTimeout(() => setDispenseSuccess(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black text-[#0b1f3a]">Central Pharmacy POS & Inventory</h1>
            <span className="bg-amber-50 text-amber-800 text-xs font-bold px-2.5 py-1 rounded border border-amber-200">
              Direct e-Rx Sync Active
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-Time Drug Dispensing, e-Prescription Fulfillment & Stock Warnings
          </p>
        </div>

        <button
          onClick={() => openAIModal('drug_checker')}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow cursor-pointer transition"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Drug Interaction Checker</span>
        </button>
      </div>

      {dispenseSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-bold flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-600" />
          <span>{dispenseSuccess}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inventory & e-Rx List */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-black text-[#0b1f3a] text-base flex items-center">
              <Pill className="w-4 h-4 mr-2 text-amber-600" /> Drug Stock Catalog
            </h3>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search medication name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white transition font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map((item) => {
              const isLowStock = item.stock <= item.reorderLevel;
              return (
                <div
                  key={item.id}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center"
                >
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 mt-1">{item.name}</h4>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      Stock: <strong className={isLowStock ? 'text-rose-600 font-bold' : 'text-emerald-700 font-bold'}>{item.stock} units</strong> • ${item.unitPrice}/unit
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition shadow-sm cursor-pointer"
                  >
                    + Add to POS
                  </button>
                </div>
              );
            })}
          </div>

          {/* Pending e-Prescriptions */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Pending e-Prescriptions Queue</h4>
            <div className="space-y-2">
              {prescriptions.map((rx) => (
                <div key={rx.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <h5 className="font-bold text-slate-900">{rx.patientName}</h5>
                    <p className="text-[11px] text-slate-500 font-medium">Dr. {rx.doctorName} • {rx.diagnosis}</p>
                  </div>
                  <button
                    onClick={() => {
                      rx.medications.forEach((m) => {
                        setCart((prev) => [...prev, { drugName: m.drugName, qty: 1, price: 5.0 }]);
                      });
                    }}
                    className="bg-white hover:bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 transition shadow-sm cursor-pointer"
                  >
                    Fulfill e-Rx
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right POS Cart & Checkout */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-black text-[#0b1f3a] text-base flex items-center">
              <ShoppingCart className="w-4 h-4 mr-2 text-emerald-600" /> POS Cart Summary
            </h3>

            {cart.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8 font-medium">Cart is empty. Select drugs from catalog.</p>
            ) : (
              <div className="space-y-2 text-xs">
                {cart.map((c, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900">{c.drugName}</p>
                      <p className="text-[10px] text-slate-500 font-medium">Qty: {c.qty} x ${c.price}</p>
                    </div>
                    <span className="font-bold text-emerald-700">${(c.qty * c.price).toFixed(2)}</span>
                  </div>
                ))}

                <div className="pt-3 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                  <span>Total Amount:</span>
                  <span className="text-emerald-700 font-black">${totalBill.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleDispense}
            disabled={cart.length === 0}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl transition shadow cursor-pointer"
          >
            Bill & Dispense Medication
          </button>
        </div>
      </div>
    </div>
  );
};
