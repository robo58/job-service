import Api from '../../Api/Api'

const state = {
    skills: []
}

const getters = {
    allSkills: (state) => state.skills
}

const actions = {
    async fetchSkills({ commit }) {

        const response = await Api.get(`/skills`)

        commit('setSkills', response.data)
    },
    async addSkill({ commit }, skill) {
        const response = await Api.post('/skills', skill)

        commit('newSkill', response.data.data)
    },
    // async updateJob({ commit }, job) {
    //     const response = await Api.put(`jobs/${job.id}`, job)

    //     commit('updatedJob', response.data.data)
    // },
    async deleteSkill({ commit }, id) {
        await Api.delete(`skills/${id}`)

        commit('removeSkill', id)
    },
}

const mutations = {
    setSkills: (state, skills) => state.skills = skills,
    newJob: (state, skill) => state.skills.data.unshift(skill),
    // updatedJob: (state, updJob) => {
    //     const index = state.jobs.data.findIndex(job => job.id === updJob.id)

    //     if (index !== -1) {
    //         state.jobs.data.splice(index, 1, updJob)
    //     }
    // },
    removeSkill: (state, id) => state.skills.data.splice(state.skills.data.map(item => item.id).indexOf(id), 1)
}

export default {
    state, getters, actions, mutations
}