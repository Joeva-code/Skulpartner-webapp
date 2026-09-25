import React, { useState } from 'react';
import { 
  Server, 
  Smartphone, 
  Database, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Globe, 
  Key, 
  CreditCard, 
  Bell, 
  FileCheck, 
  CheckCircle,
  ExternalLink,
  Lock,
  Workflow
} from 'lucide-react';

interface ComponentNode {
  id: string;
  name: string;
  category: 'client' | 'gateway' | 'service' | 'storage' | 'compliance';
  tech: string;
  description: string;
  security: string;
  scaleSla: string;
}

const ARCHITECTURE_NODES: ComponentNode[] = [
  {
    id: 'client_android',
    name: 'Android Mobile Application (Primary)',
    category: 'client',
    tech: 'React Native / Flutter + Kotlin bridge',
    description: 'Mobile-first client optimized for Nigerian parents with low bandwidth resilience, offline state caching, and biometric biometric unlock.',
    security: 'Certificate pinning, secure hardware keystore, AES-256 local encrypted cache.',
    scaleSla: 'Target: 60,000 enrolled parents in Year 1 · Cold launch < 1.8s'
  },
  {
    id: 'client_web',
    name: 'Responsive Web & Bursar Portal',
    category: 'client',
    tech: 'React 19 + TypeScript + Tailwind CSS',
    description: 'Desktop-first experience for institutional school bursars, managing partners, and back-office compliance auditors.',
    security: 'Strict CSP, HttpOnly SameSite=Strict cookies, anti-CSRF tokens.',
    scaleSla: 'P95 latency < 120ms across Nigerian ISP networks'
  },
  {
    id: 'api_gateway',
    name: 'API Gateway & Traffic Orchestrator',
    category: 'gateway',
    tech: 'Envoy / Kong API Gateway + Cloud Run',
    description: 'Reverse proxy managing rate-limiting, SSL termination, JWT token verification, and payload size validation.',
    security: 'WAF rules blocking SQL injection, IP throttling (max 100 req/min/IP).',
    scaleSla: 'Handles 10,000 concurrent req/sec peak during term start'
  },
  {
    id: 'svc_kyc',
    name: 'KYC & AML Verification Microservice',
    category: 'service',
    tech: 'Node.js / Express + Smile Identity & Prembly',
    description: 'Integrates with NIBSS for BVN validation, NIMC for NIN verification, and PEP / Sanctions screening for AML compliance.',
    security: 'BVN/NIN tokenization; raw sensitive numbers never logged in plaintext.',
    scaleSla: 'Verification SLA: Real-time API match < 3.2 seconds'
  },
  {
    id: 'svc_ledger',
    name: 'Double-Entry Escrow & Yield Engine',
    category: 'service',
    tech: 'Go / Python FastAPI + PostgreSQL Strict ACID',
    description: 'Executes the mathematical 70% model, daily ROI accruals (0.8%-1.0%), and the 10% platform payout commission deduction.',
    security: 'Immutable audit ledger; cryptographic transaction signatures.',
    scaleSla: 'Daily midnight batch: 60,000 user yields settled in < 4 minutes'
  },
  {
    id: 'svc_paystack',
    name: 'Payment & Direct School Settlement Worker',
    category: 'service',
    tech: 'Node.js + Paystack Transfers API & NIBSS Instant Payments',
    description: 'Ingests parent upfront 70% capital payments and automates termly direct bank transfers to accredited school accounts.',
    security: 'Idempotency keys on all webhook events, dual authorization for payouts > ₦500,000.',
    scaleSla: 'Immediate webhook settlement within 500ms of bank clearance'
  },
  {
    id: 'svc_clock',
    name: 'Term Cycle Clock Dispatcher',
    category: 'service',
    tech: 'Temporal.io / BullMQ Worker on Redis',
    description: 'Manages the 121, 123, and 183-day lifecycle state machines, term milestones, 48-hour grace warnings, and 5% late fines.',
    security: 'Distributed Redis redlocks to guarantee zero duplicate payout triggers.',
    scaleSla: 'Zero drift scheduling across multi-node clusters'
  },
  {
    id: 'db_postgres',
    name: 'Primary Relational Database',
    category: 'storage',
    tech: 'PostgreSQL 16 (Multi-AZ with read replicas)',
    description: 'Authoritative relational store for user identities, beneficiaries, school accounts, and financial transactions.',
    security: 'Encryption at rest (AES-256), SSL in transit, automated daily WAL backups.',
    scaleSla: '99.99% availability, read replica lag < 50ms'
  },
  {
    id: 'storage_vault',
    name: 'Encrypted S3 Document Vault',
    category: 'storage',
    tech: 'AWS S3 / GCP Cloud Storage with SSE-KMS',
    description: 'Encrypted storage for school fee vouchers, NIN slips, utility bills, and bursary stamped verification receipts.',
    security: 'Time-limited signed URLs (expires in 15 mins), server-side KMS encryption.',
    scaleSla: '11 9s durability, geo-redundant storage'
  },
  {
    id: 'reg_compliance',
    name: 'Regulatory & Compliance Framework Layer',
    category: 'compliance',
    tech: 'CBN, NDIC, SCUML/EFCC & NDPR Auditing Pipeline',
    description: 'Maintains compliant operations under the Federal Department of Cooperatives, generating quarterly AML reports and NDIC protection certificates.',
    security: 'Immutable audit logs with actor tracking and before/after state diffs.',
    scaleSla: 'Full audit trails retained for 7 years as mandated by Nigerian law'
  }
];

export const SystemArchitectureDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ComponentNode>(ARCHITECTURE_NODES[0]);

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">SYSTEM BLUEPRINT & SPECIFICATION</div>
            <h2 className="text-xl font-bold text-neutral-900 mt-0.5">SKULPARTNERS Multi-Tier Cloud Architecture</h2>
            <p className="text-xs text-neutral-600 mt-1 max-w-2xl leading-relaxed">
              Designed to scale to 60,000 enrollments in Year 1 while complying with CBN, NDIC underwriting, SCUML anti-money laundering, and NDPR privacy standards.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-center">
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Production Architecture
            </span>
          </div>
        </div>
      </div>

      {/* Main Visual Topology Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Architecture Topology View (Left 7 Cols) */}
        <div className="lg:col-span-7 bg-neutral-900 text-white rounded-3xl p-6 shadow-xl border border-neutral-800 space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Workflow className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">Interactive Component Topology</span>
            </div>
            <span className="text-[11px] text-neutral-400">Click any block to inspect technical specs</span>
          </div>

          {/* Tier 1: Client Layer */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest">1. CLIENT LAYER</div>
            <div className="grid grid-cols-2 gap-3">
              {ARCHITECTURE_NODES.filter(n => n.category === 'client').map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                    selectedNode.id === node.id
                      ? 'bg-emerald-950/80 border-emerald-400 shadow-md ring-1 ring-emerald-400'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold truncate">{node.name}</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 truncate">{node.tech}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tier 2: Gateway */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest">2. EDGE & API GATEWAY</div>
            {ARCHITECTURE_NODES.filter(n => n.category === 'gateway').map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`w-full p-3.5 rounded-2xl text-left border transition-all ${
                  selectedNode.id === node.id
                    ? 'bg-emerald-950/80 border-emerald-400 shadow-md ring-1 ring-emerald-400'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold">{node.name}</span>
                  </div>
                  <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-neutral-300">WAF & SSL</span>
                </div>
                <div className="text-[10px] text-neutral-400">{node.tech}</div>
              </button>
            ))}
          </div>

          {/* Tier 3: Core Microservices */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest">3. CORE FINANCIAL & LIFECYCLE MICROSERVICES</div>
            <div className="grid grid-cols-2 gap-3">
              {ARCHITECTURE_NODES.filter(n => n.category === 'service').map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                    selectedNode.id === node.id
                      ? 'bg-emerald-950/80 border-emerald-400 shadow-md ring-1 ring-emerald-400'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Cpu className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold truncate">{node.name}</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 truncate">{node.tech}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tier 4: Storage & Compliance */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest">4. DATA, ESCROW STORAGE & REGULATORY REPOSITORY</div>
            <div className="grid grid-cols-3 gap-3">
              {ARCHITECTURE_NODES.filter(n => n.category === 'storage' || n.category === 'compliance').map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    selectedNode.id === node.id
                      ? 'bg-emerald-950/80 border-emerald-400 shadow-md ring-1 ring-emerald-400'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Database className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[11px] font-bold truncate">{node.name}</span>
                  </div>
                  <div className="text-[9px] text-neutral-400 truncate">{node.tech}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Component Inspection Panel (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-neutral-200 pb-3">
              <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                {selectedNode.category.toUpperCase()} COMPONENT
              </span>
              <h3 className="text-base font-bold text-neutral-900 mt-2">{selectedNode.name}</h3>
              <div className="text-xs font-mono-tabular text-neutral-500 mt-0.5">{selectedNode.tech}</div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-bold text-neutral-800 text-[11px] uppercase tracking-wider mb-1">Functional Responsibility</h4>
                <p className="text-neutral-600 leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                  {selectedNode.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-neutral-800 text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  Security & Compliance Invariants
                </h4>
                <p className="text-neutral-600 leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                  {selectedNode.security}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-neutral-800 text-[11px] uppercase tracking-wider mb-1">Scalability & Performance SLA</h4>
                <p className="text-neutral-600 leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-200 font-mono-tabular">
                  {selectedNode.scaleSla}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 text-xs text-neutral-500 flex items-center justify-between">
            <span>Verified for Year 1 scale (60k users)</span>
            <span className="font-semibold text-emerald-700">Audit Status: Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};
