class Api::CommentsController < ApplicationController

  def index
    @comments = Comment.includes(:author).where(property_id: params[:property_id]).order("created_at desc")
    
    render :index
  end
  
  def create
    @comment = current_user.authored_comments.new(comment_params)

    @comment.property_id = params[:property_id]
    if @comment.save
      render json: @comment
    else
      render json: @comment.errors.full_messages
    end
    
  end
  
  def show
    @comment = Comment.includes(:author).find(params[:id])

    render :show
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors.full_messages
    end
  end
  
  def destroy
    @comment = Comment.find(params[:id])
    if @comment.destroy
      render json: @comment
    else
      render json: @comment.errors.full_messages
    end
  end
  
  def comment_params
    params.require(:comment).permit(:title, :body)
  end
end
