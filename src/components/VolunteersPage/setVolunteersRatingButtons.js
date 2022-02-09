import Categories from "../../assets/data/Categories";
import setCategoryIcon from "../../theme/setCategoryIcon";

function setVolunteersRatingButtons (volunteersList){
    
    const thePopularCategoriesButtons = (Categories.map(category=>{
        let rate=0;
        volunteersList.volunteers?.map(volunteer=>{
            (volunteer.categories).forEach(volunteerCategory=>{
                if(volunteerCategory===category.value){
                    rate++;
                }
            });
            return rate;
        });
        category.rate=rate;
        category.buttonColor = setCategoryIcon(category.value)[1];
        category.icon = setCategoryIcon(category.value)[0];
        return category
        })).sort(compare);

    return thePopularCategoriesButtons;
}

export default setVolunteersRatingButtons;

function compare( a, b ) {
    if ( a.rate > b.rate  ){
      return -1;
    }
    if ( a.rate < b.rate ){
      return 1;
    }
    return 0;
  };
