import zustand from 'zustand';

export const useJobsStore = zustand((set) => ({
    jobs: [],
    setJobs: (jobs) => set({ jobs }),
    addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs ] })),
    removeJob: (jobId) => set((state) => ({
        jobs: state.jobs.filter((job) => job.id !== jobId)
    })),
    clearJobs: () => set({ jobs: [] }),
}))