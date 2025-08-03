'use client';

import { useEffect, useState } from 'react';

interface PackageItem {
  id: string;
  tripName: string;
  location: string;
  tier: string;
  price?: number | null;
  duration: string;
  travelers: number;
  specialRequests?: string;
  tripType: string;
}

interface PackagesGrouped {
  [location: string]: PackageItem[];
}

export default function PackagesCRM() {
  const [packages, setPackages] = useState<PackagesGrouped>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/packages', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setPackages(data.packages);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchPackages();
  }, []);

  function getTierStyles(tier: string) {
    switch (tier.toLowerCase()) {
      case 'premium':
        return { borderColor: '#FFD700', backgroundColor: '#FFF9E6', color: '#B8860B' };
      case 'deluxe':
        return { borderColor: '#1E90FF', backgroundColor: '#E9F1FB', color: '#104E8B' };
      case 'basic':
        return { borderColor: '#32CD32', backgroundColor: '#E9F9E9', color: '#228B22' };
      default:
        return { borderColor: '#ddd', backgroundColor: '#fff', color: '#555' };
    }
  }

  const handlePlanNewTrip = () => {
    window.location.href = '/plan-new-trip';
  };

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen",
        backgroundColor: '#f5f7fa',
        minHeight: '100vh',
        color: '#333',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#222' }}>Packages</h1>
        <button
          onClick={handlePlanNewTrip}
          style={{
            padding: '0.65rem 1.3rem',
            backgroundColor: '#5c4d7d',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1.1rem',
            boxShadow: '0 4px 8px rgba(92, 77, 125, 0.3)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#7b66a1')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#5c4d7d')}
          aria-label="Plan New Trip"
        >
          + Plan New Trip
        </button>
      </header>

      {error && (
        <p
          style={{
            color: '#e74c3c',
            backgroundColor: '#fdecea',
            padding: '1rem 1.5rem',
            borderRadius: '6px',
            maxWidth: '500px',
            marginBottom: '2rem',
            boxShadow: '0 0 10px rgba(231, 76, 60, 0.15)',
          }}
        >
          {error}
        </p>
      )}

      {Object.keys(packages).length === 0 && !error && (
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Loading packages...</p>
      )}

      {Object.entries(packages).map(([location, packageList]) => (
        <section key={location} style={{ marginBottom: '3rem' }}>
          <h2
            style={{
              borderBottom: '3px solid #ccc',
              paddingBottom: '0.6rem',
              fontSize: '1.6rem',
              color: '#555',
              marginBottom: '1rem',
            }}
          >
            {location}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {packageList.map((pkg) => {
              const styles = getTierStyles(pkg.tier);
              return (
                <article
                  key={pkg.id}
                  style={{
                    border: `3px solid ${styles.borderColor}`,
                    backgroundColor: styles.backgroundColor,
                    color: styles.color,
                    padding: '1.5rem 1.8rem',
                    borderRadius: '12px',
                    boxShadow: '0 6px 15px rgba(0,0,0,0.07)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '200px',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.07)';
                  }}
                  title={`View details for ${pkg.tripName || 'Unnamed Trip'}`}
                >
                  <h3
                    style={{
                      marginBottom: '0.6rem',
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      color: styles.color,
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    {pkg.tripName || 'Unnamed Trip'}
                  </h3>
                  <p style={{ margin: '0.3rem 0' }}>
                    <b>Tier:</b> {pkg.tier}
                  </p>
                  <p style={{ margin: '0.3rem 0' }}>
                    <b>Price:</b> ₹{pkg.price != null ? pkg.price.toLocaleString() : 'N/A'}
                  </p>
                  <p style={{ margin: '0.3rem 0' }}>
                    <b>Duration:</b> {pkg.duration}
                  </p>
                  <p style={{ margin: '0.3rem 0' }}>
                    <b>Travelers:</b> {pkg.travelers}
                  </p>
                  <p style={{ margin: '0.3rem 0' }}>
                    <b>Trip Type:</b> {pkg.tripType}
                  </p>
                  {pkg.specialRequests && (
                    <p style={{ marginTop: '0.6rem', fontStyle: 'italic', fontSize: '0.9rem' }}>
                      <b>Requests:</b> {pkg.specialRequests}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
