export function calculateRanking(profile) {
  if (!profile) return 0;

  // 1. Profile completion
  const fields = [
    profile.name,
    profile.title,
    profile.bio,
    profile.avatar_url,
    profile.hourly_rate,
    profile.skills?.length,
    profile.portfolio?.length,
  ];

  const completion = (fields.filter(Boolean).length / fields.length) * 100;

  // 2. Rating (max 5 → convert to 100)
  const ratingScore = ((profile.rating || 0) / 5) * 100;

  // 3. Jobs completed (max cap 50 jobs)
  const jobsScore = Math.min((profile.jobs_completed || 0) * 2, 100);

  // 4. Response rate (already %)
  const responseScore = profile.response_rate || 0;

  // 5. Earnings (log scale to avoid inflation)
  const earningsScore = Math.min((profile.earnings || 0) / 1000, 100);

  // 6. Portfolio strength
  const portfolioScore = Math.min((profile.portfolio?.length || 0) * 10, 100);

  // FINAL SCORE (weighted like Upwork/Fiverr)
  const score =
    completion * 0.25 +
    ratingScore * 0.25 +
    jobsScore * 0.2 +
    responseScore * 0.15 +
    earningsScore * 0.1 +
    portfolioScore * 0.05;

  return Math.round(score);
}