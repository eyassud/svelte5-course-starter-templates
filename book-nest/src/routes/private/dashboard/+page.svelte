<script lang="ts">
  import BookCard from "$components/BookCard.svelte";
  import BookCategory from "$components/BookCategory.svelte";
  import StarRating from "$components/StarRating.svelte";
  import { getUserState } from "$lib/state/user-state.svelte";
  import Icon from "@iconify/svelte";

  let userContext = getUserState();
  let { userName, allBooks } = $derived(userContext);
</script>

<div>
  <div class="dashboard-header mb-m">
    <a href="/private/scan-shelf" class="add-book">
      <Icon icon="icons8:plus" width={"72"} height={"72"} />
      <p>Add a book</p>
    </a>
    <div class="headline">
      <h3 class="bold mb-xs">Welcome Back, {userName}</h3>
      <p>
        There's nothing quite like the journey of a good book. Here are some of
        the books you've added to your shelf.
      </p>
    </div>
  </div>

  {#if allBooks.length}
    {#if userContext.getHighestRatedBooks().length}
      <BookCategory
        booksToDisplay={userContext.getHighestRatedBooks()}
        categoryName="Your favorite books"
      />
    {/if}
    <BookCategory
      booksToDisplay={userContext.getUnreadBooks()}
      categoryName="Recently added, unread books"
    />
    {#if userContext.getFavoriteGenre()}
      <BookCategory
        booksToDisplay={userContext.getFavoriteGenre()}
        categoryName="Highest rated books from your favorite genre: Fantasy"
      />
    {/if}
  {:else}
    <a href="/private/scan-shelf" class="upload-hint mt-l">
      <h3>
        You have no books in your library at this time. Click here to get
        started!
      </h3>
      <div class="mt-m">
        <Icon icon="icons8:plus" width={"72"} height={"72"} />
        <p>Add books</p>
      </div>
    </a>
  {/if}
</div>

<style>
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }

  .add-book {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .add-book p {
    margin-left: 8px;
  }

  .headline {
    text-align: right;
    max-width: 30%;
    min-width: 300px;
  }

  .upload-hint {
    text-decoration: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .upload-hint div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
