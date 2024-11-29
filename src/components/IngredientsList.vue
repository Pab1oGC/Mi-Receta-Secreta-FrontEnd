<template>
    <div>
        <h1>Ingredients list</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ingredient in ingredients" :key="ingredient.id">
                    <td>{{ ingredient.name }}</td>
                    <td>{{ ingredient.description }}</td>
                    <td>{{ ingredient.type }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { getIngredients } from '@/services/apiSecretRecipe';
    import { ref, onMounted} from "vue";

    export default {
        setup(){
            const ingredients = ref([]);

            onMounted(async () => {
                try{
                    ingredients.value = await getIngredients();
                }catch(error){
                    console.error(error);
                }
            });

            return {ingredients};
        }
    }
</script>
