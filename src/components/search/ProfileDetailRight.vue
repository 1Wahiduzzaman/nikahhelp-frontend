<template>
    <div>
        <AcceptDecline />
        <SuggestionCandidate />
    </div>
</template>

<script>
import AcceptDecline from '@/components/atom/AcceptDecline'
import SuggestionCandidate from '@/components/search/SuggestionCandidate'
export default {
    name: 'ProfileDetailRight',
    components: {
        AcceptDecline,
        SuggestionCandidate
    }
}
</script>
