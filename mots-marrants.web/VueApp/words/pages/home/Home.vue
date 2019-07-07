<template>
    <div>
        <div class="tip" v-if="!storage.isAuthenticated()">
            Identifiez-vous pour créer votre sampler <font-awesome-icon icon="level-up-alt" />
        </div>
        <div class="search">
            <input type="text" v-model="search" placeholder="Recherche">
        </div>
        <div class="params" v-if="!isLoading">
            <a @click="sort('rate', true)"><font-awesome-icon icon="sort-numeric-down" /> </a>
            <a @click="sort('rate', false)"><font-awesome-icon icon="sort-numeric-up" /> </a>
            <a @click="sort('word', false)"><font-awesome-icon icon="sort-alpha-down" /> </a>
            <a @click="sort('word', true)"><font-awesome-icon icon="sort-alpha-up" /> </a>
            <a @click="shuffle()"><font-awesome-icon icon="random" /> </a>
            <a @click="showFilters = !showFilters">
                <font-awesome-icon icon="hashtag" />
                <span class="notif" v-if="disabledTags.length > 0"></span>
            </a>
        </div>
        <div v-if="isNewWord" class="add-word">
            Le mot {{search}} n'a pas encore été proposé.
            <br>
            <a class="add-button" @click="openAddModal">Ajouter {{search}}</a>
        </div>
        <div class="word-list" v-if="!isLoading">
            <div class="word-item" v-for="word in filteredWords" :key="word.word">
                <div>
                    {{ word.word }}
                </div>
                <div class="rate">
                    <font-awesome-icon  icon="star" />
                    {{word.rate}}
                    <small title="Nombre de votes">{{word.rateCount}}</small>
                </div>
                <a class="vote-button" v-if="canVote(word)" @click="openModal(word)" title="Voter">
                    <font-awesome-icon icon="vote-yea" />
                </a>
                <div class="a-vote" v-else>
                    <font-awesome-icon icon="vote-yea" />
                </div> 
                <a class="sampler-button" v-if="isAuthenticated" @click="addToSampler(word)" title="Ajouter à mon sampler">
                    <font-awesome-icon  icon="plus-square" />
                </a>
                <a class="play-button" @click="speek(word)"><font-awesome-icon  icon="play" /></a>
            </div>
        </div> 
        <div v-if="isLoading" class="loading">
            Chargement...
        </div>
        <notifications group="words" position="bottom center" />

        <div v-if="showModal">
            <div class="bg-modal">
                <div class="modal">
                    <div class="modal-header">
                        <h2>
                        Votez pour {{currentWord.word}}
                        </h2>
                    </div>
                    <div class="modal-content">
                        <div class="stars">
                            <div class="stars">
                                <span v-for="value in [5,4,3,2,1]" :key="value"
                                @click="vote(currentWord, value)">☆</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a class="cancel-button" @click="showModal = false">
                            <font-awesome-icon icon="times" /> Annuler
                        </a>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="showFilters"> 
            <div class="bg-modal">
                <div class="modal">
                    <div class="modal-header">
                        <h2>
                        Tags actifs
                        </h2>
                    </div>
                    <div class="modal-contenT">
                        <div class="tags">
                            <div class="tag" v-for="tag in allTags" :key="tag" v-bind:class="{'active': disabledTags.indexOf(tag) == -1}" @click="toggleTag(tag)">
                                <font-awesome-icon icon="hashtag" /> 
                                {{tag}}
                                <span class="tag-icon">
                                    <font-awesome-icon icon="check" />
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <a class="cancel-button" @click="showFilters = false">
                            <font-awesome-icon icon="times" /> Fermer
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showAddModal">
            <div class="bg-modal">
                <div class="modal">
                    <div class="modal-header">
                        <h2>
                        Ajouter {{currentWord.word}}
                        </h2>
                    </div>
                    <div class="modal-content" >
                        <label>Type de mot *</label>
                        <select v-model="wordType">
                            <option value="" disabled hidden></option>
                            <option value="NomCommun">Nom commun</option>
                            <option value="NomPropre">Nom propre</option>
                            <option>Adjectif</option>
                            <option>Verbe</option>
                            <option>Adverbe</option>
                        </select>
                        <div v-if="wordType">
                            <label>Ajouter des tags</label>
                            <select v-model="tags" multiple>
                                <option>Argot</option>
                                <option>Marque</option>
                                <option>Personnalité</option>
                                <option>Géographie</option>
                                <option>Gentilé</option>
                            </select>
                        </div>
                        <div v-if="currentWord.tags" class="tags">
                            <span v-for="tag in currentWord.tags.split(',')" :key="tag" class="tag">#{{tag}}</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a class="confirm-button" @click="onAdd" v-if="wordValid()">
                            <font-awesome-icon icon="plus" /> Ajouter
                        </a>
                        <a class="cancel-button" @click="showAddModal = false">
                            <font-awesome-icon icon="times" /> Annuler
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss" src="./Home.scss"></style>

<script src="./Home.ts"></script>