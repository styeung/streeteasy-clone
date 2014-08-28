class CommentsController < ApplicationController
  def new
    @comment = current_user.authored_comments.new()
    render :new
  end
  
  def create
    @comment = current_user.authored_comments.new(comment_params)
    @comment.property_id = params[:property_id]
    if @comment.save
      redirect_to property_url(params[:property_id])
    else
      flash.now[:errors] = @comment.errors.full_messages
      render :new
    end
    
  end
  
  def edit
    @comment = Comment.find(params[:id])
    if @comment
      render :edit
    else
      render json: "Comment not found"
    end
  end
  
  def update
    @comment = Comment.find(params[:id])
    if @comment.update(comment_params)
      redirect_to property_url(params[:property_id])
    else
      flash.now[:errors] = @comment.errors.full_messages
      render :edit
    end
  end
  
  def destroy
    @comment = Comment.find(params[:id])
    if @comment.destroy
      redirect_to property_url(params[:property_id])
    else
      render json: "Your comment could not be deleted.  Pleae try again"
    end
  end
  
  def comment_params
    params.require(:comment).permit(:title, :body)
  end
end
