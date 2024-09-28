hexo.extend.helper.register('get_category_posts',function(currPath, currCatName){
    // console.log(currCatName);
    var categoryPostArr = []
    hexo.locals.get('categories').map(function (category) {
        var categoryArr = []
        // console.log(category)
        for (let i=0;i<category.posts.length;i++){
            let post = category.posts.data[i];
            categoryArr.push({ name: post.title, value: post.path })
        }
        categoryPostArr.push({
            name: category.name, 
            path: category.path, 
            content: categoryArr,
            id :category._id, 
            children: [], 
            hasParent: 0})
        if('parent' in category){
            categoryPostArr[categoryPostArr.length-1].hasParent = 1
            var index = -1
            for(let i=0; i<categoryPostArr.length; i++){
                if(categoryPostArr[i].id == category.parent){
                    index=i
                    break
                }
            }
            // console.log(index)
            categoryPostArr[index].children.push(categoryPostArr.length-1)
        }
        // console.log({name: category.name,content: categoryArr})
    })
    // console.log(categoryPostArr)
    // strCategories = `<style type="text/css"> 
    //     #category-lists a{font-size:20px; color:#8D9519;}
    //     #category-lists-second a{font-size:18px; color:#0C9C0C;}
    //     #category-articles a{font-size:15px; color:#009999;}
    //     </style>`
    strCategories=''
    var pathToRoot = '';
    var iUpper = currPath.split('/').length - 1;
    if (iUpper==0) { iUpper=1; }
    for (let index = 0; index < iUpper; index++) {
        pathToRoot += '../';
    }
    for (let i = 0; i < categoryPostArr.length; i++) {
        if(currCatName=='fullCategory' && categoryPostArr[i].hasParent){
            continue
        }
        if (currCatName!='fullCategory' && categoryPostArr[i].name!=currCatName) {
            continue
        }
        
        strTemp = `
            <div>
                <a href="`+pathToRoot+`${categoryPostArr[i].path}" id="category-lists">
                    <i class="fas fa-archive"></i>${categoryPostArr[i].name}
                </a>
            </div>`;
        if(categoryPostArr[i].children.length == 0){
            for(let j = 0; j < categoryPostArr[i].content.length; j++){
                strTemp += `
                    <div>
                        <a href="`+pathToRoot+`${categoryPostArr[i].content[j].value}" id="category-articles">
                            <i class="fas fa-book"></i>${categoryPostArr[i].content[j].name}
                        </a>
                    </div>`;
            }
        }
        else{
            for(let j=0; j<categoryPostArr[i].children.length; j++){
                var categoryTmp = categoryPostArr[categoryPostArr[i].children[j]]
                strTemp += `
                    <div>
                        <a href="`+pathToRoot+`${categoryTmp.path}" id="category-lists-second">
                            <i class="fas fa-archive"></i>${categoryTmp.name}
                        </a>
                    </div>`;
                for(let k = 0; k < categoryTmp.content.length; k++){
                    strTemp += `
                        <div>
                            <a href="`+pathToRoot+`${categoryTmp.content[k].value}" id="category-articles">
                                <i class="fas fa-book"></i>${categoryTmp.content[k].name}
                            </a>
                        </div>`;
                }
            }
        }
        if (!strTemp) {
            for (let i = 0; i < categoryPostArr.length; i++) {
                if (categoryPostArr[i].name==currCatName) {
                    strTemp += `
                        <div>
                            <a href="`+pathToRoot+`${categoryPostArr[i].path}" id="category-lists-second">
                                <i class="fas fa-archive"></i>${categoryPostArr[i].name}
                            </a>
                        </div>`;
                    for(let k = 0; k < categoryPostArr[i].content.length; k++){
                        strTemp += `
                        <div>
                            <a href="`+pathToRoot+`${categoryPostArr[i].content[k].value}" id="category-articles">
                                <i class="fas fa-book"></i>${categoryPostArr[i].content[k].name}
                            </a>
                        </div>`;
                    }
                    break;
                }
            }
        }
        strCategories+=strTemp
    }
    // console.log(strCategories)
    return strCategories
})