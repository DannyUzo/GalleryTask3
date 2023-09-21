const Skeleton = ({item}) =>{
    return[...Array(item).keys()].map(()=> (
        <div>
            <div className="SkeletonCard">
               <div class="spinner"></div>
            </div>
        </div>
    ))
}
export default Skeleton